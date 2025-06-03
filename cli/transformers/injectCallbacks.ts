import fs from 'fs-extra';

import prettier from 'prettier';

import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';
import generate from '@babel/generator';

import { removeDirFiltered } from '../utils/removeDirFiltered.js';

interface InjectOptions {
  locations: string[];
  projectDir: string;
  isTestFunctionalityEnabled: boolean;
}

const locationCallbacks: Record<string, string[]> = {
  'lcard-1': ['initCallback'],
  'ccard-1': ['initCallback'],
  'comcard-1': ['initCallback'],

  'llist-0': ['initCallback', 'leadsSelectedCallback'],
  'llist-1': ['initCallback', 'leadsSelectedCallback'],

  'clist-0': ['initCallback', 'contactsSelectedCallback'],
  'clist-1': ['initCallback', 'contactsSelectedCallback'],

  'tlist-0': ['initCallback', 'todoSelectedCallback'],
  'tlist-1': ['initCallback', 'todoSelectedCallback'],

  'settings': ['settingsCallback'],
  'advanced_settings': ['advancedSettingsCallback'],
  'card_sdk': [
    'loadPreloadedDataCallback',
    'loadElementsCallback',
    'linkCardCallback',
  ],
  'widget_page': ['initMenuPageCallback'],
  'catalogs': ['onSaveCallback', 'loadCatalogElementCallback'],
  'everywhere': ['onSaveCallback'],
  'lead_sources': ['onAddAsSourceCallback'],
  'salesbot_designer': [
    'onSalesbotDesignerSaveCallback',
    'salesbotDesignerSettingsCallback',
  ],
  'digital_pipeline': ['dpSettingsCallback'],
};

const preserveCallbacksSet = new Set([
  'onSaveCallback',
  'settingsCallback',
  'destroyCallback',
  'renderCallback',
  'bindActionsCallback',
]);

const filterCallbackFileSystem = async (options: {
  locations: InjectOptions['locations'];
  projectDir: InjectOptions['projectDir'];
  isTestFunctionalityEnabled: InjectOptions['isTestFunctionalityEnabled'];
}) => {
  const { locations, projectDir, isTestFunctionalityEnabled } = options;

  const clientSrcDir = `${projectDir}/client/src/`;

  locations.forEach((location) => {
    const callbacks = locationCallbacks[location];

    if (!callbacks) {
      return;
    }

    callbacks.forEach((callback) => {
      preserveCallbacksSet.add(callback);
    });
  });

  /**
   * initCallback is used by default to render specific
   * widget pages.
   *
   * If we don't want to render any widget pages
   * we need to replace it with an empty callback.
   */
  if (!preserveCallbacksSet.has('initCallback')) {
    preserveCallbacksSet.add('initCallback');

    await fs.remove(`${clientSrcDir}/initCallback`);

    await fs.copy(
      `${clientSrcDir}/__emptyCallbacks__/initCallback`,
      `${clientSrcDir}/callbacks/initCallback`
    );
  }

  if (!isTestFunctionalityEnabled) {
    await Promise.all([
      fs.remove(`${clientSrcDir}/callbacks`),
      fs.remove(`${clientSrcDir}/pages/*`),
      fs.remove(`${clientSrcDir}/components/*`),
    ]);

    await fs.copy(
      `${clientSrcDir}/__emptyCallbacks__`,
      `${clientSrcDir}/callbacks`
    );
  }

  await fs.remove(`${clientSrcDir}/__emptyCallbacks__`);

  const allowedCallbacksRegexp = new RegExp(
    `/(${Array.from(preserveCallbacksSet).join('|')})`
  );

  await removeDirFiltered(`${clientSrcDir}/callbacks`, (filePath) => {
    if (allowedCallbacksRegexp.test(filePath)) {
      return false;
    }

    return true;
  });
};

const callbacksMap: Record<string, string> = {
  initCallback: 'initCallback',
  settingsCallback: 'settings',
  advancedSettingsCallback: 'advancedSettings',
  initMenuPageCallback: 'initMenuPage',
  onAddAsSourceCallback: 'onAddAsSource',
  onSalesbotDesignerSaveCallback: 'onSalesbotDesignerSave',
  leadsSelectedCallback: 'leads.selected',
  contactsSelectedCallback: 'contacts.selected',
  dpSettingsCallback: 'dpSettings',
  salesbotDesignerSettingsCallback: 'salesbotDesignerSettings',
  loadPreloadedDataCallback: 'loadPreloadedData',
  loadElementsCallback: 'loadElements',
  linkCardCallback: 'linkCard',
};

export const injectCallbackToIntegrationSetupFile = async ({
  projectDir,
}: {
  projectDir: string;
}) => {
  const integrationFilePath = `${projectDir}/client/src/integration.ts`;
  const fileCode = await fs.readFile(integrationFilePath, 'utf8');

  const ast = parser.parse(fileCode, {
    sourceType: 'module',
    plugins: ['typescript'],
  });

  const existingImports = new Set<string>();
  const existingCallbackStrings = new Set<string>();
  const existingCallbackNames = new Set<string>();

  let integrationExprStatement: t.ExpressionStatement | undefined;

  /**
   * Collect all needed info from integration file
   */
  traverse.default(ast, {
    ImportDeclaration(path) {
      const source = path.node.source.value;

      existingImports.add(source);

      for (const specifier of path.node.specifiers) {
        if (
          t.isImportSpecifier(specifier) ||
          t.isImportDefaultSpecifier(specifier)
        ) {
          existingCallbackNames.add(specifier.local.name);
        }
      }
    },

    CallExpression(path) {
      const callee = path.node.callee;

      if (
        t.isMemberExpression(callee) &&
        t.isIdentifier(callee.property, { name: 'addCallback' })
      ) {
        const args = path.node.arguments;

        if (args.length === 2 && t.isStringLiteral(args[1])) {
          existingCallbackStrings.add(args[1].value);
        }

        if (
          t.isMemberExpression(callee.object) &&
          t.isIdentifier(callee.object.object, { name: 'integration' })
        ) {
          integrationExprStatement = path.findParent((p) =>
            p.isExpressionStatement()
          )?.node as t.ExpressionStatement;
        } else if (t.isIdentifier(callee.object, { name: 'integration' })) {
          integrationExprStatement = path.findParent((p) =>
            p.isExpressionStatement()
          )?.node as t.ExpressionStatement;
        }
      }
    },
  });

  /**
   * Add needed callback names
   */
  const validPreservedCallbacks = [...preserveCallbacksSet].filter((name) => {
    return name in callbacksMap;
  });

  /**
   * Add missed imports after last "@callbacks/*"
   */
  const lastCallbackImportIndex = ast.program.body.reduce(
    (lastIndex, node, index) => {
      if (
        t.isImportDeclaration(node) &&
        node.source.value.startsWith('@callbacks/')
      ) {
        return index;
      }

      return lastIndex;
    },
    -1
  );

  for (const callbackName of validPreservedCallbacks) {
    const importPath = `@callbacks/${callbackName}`;

    if (!existingImports.has(importPath)) {
      const importDecl = t.importDeclaration(
        [
          t.importSpecifier(
            t.identifier(callbackName),
            t.identifier(callbackName)
          ),
        ],
        t.stringLiteral(importPath)
      );

      ast.program.body.splice(lastCallbackImportIndex + 1, 0, importDecl);
    }
  }

  /**
   * Update callbacks in integration chain.
   */
  const missingCallbacks = validPreservedCallbacks
    .map((callbackName) => [callbackName, callbacksMap[callbackName]] as const)
    .filter(([_, callbackStr]) => !existingCallbackStrings.has(callbackStr));

  if (missingCallbacks.length > 0) {
    let currentExpr: t.Expression;

    if (integrationExprStatement) {
      currentExpr = (integrationExprStatement as t.ExpressionStatement)
        .expression;
    } else {
      currentExpr = t.identifier('integration');
    }

    for (const [callbackName, callbackStr] of missingCallbacks) {
      currentExpr = t.callExpression(
        t.memberExpression(currentExpr, t.identifier('addCallback')),
        [t.identifier(callbackName), t.stringLiteral(callbackStr)]
      );
    }

    const newStatement = t.expressionStatement(currentExpr);

    if (integrationExprStatement) {
      const index = ast.program.body.findIndex(
        (n) => n === integrationExprStatement
      );

      ast.program.body[index] = newStatement;
    } else {
      ast.program.body.push(newStatement);
    }
  }

  const generated = generate.default(ast, { retainLines: true }).code;

  const prettierConfig = await fs.readFile(`${projectDir}/.prettierrc`, 'utf8');

  const formatted = await prettier.format(generated, {
    parser: 'typescript',
    ...JSON.parse(prettierConfig),
  });

  await fs.writeFile(integrationFilePath, formatted, 'utf8');
};

export const injectCallbacks = async (options: InjectOptions) => {
  const { projectDir, locations, isTestFunctionalityEnabled } = options;

  await filterCallbackFileSystem({
    projectDir,
    locations,
    isTestFunctionalityEnabled,
  });

  await injectCallbackToIntegrationSetupFile({ projectDir });
};
