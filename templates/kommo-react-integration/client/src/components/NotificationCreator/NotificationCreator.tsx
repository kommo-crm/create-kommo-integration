import React, { FC, useState, useId } from 'react';

import {
  RadioGroup,
  RadioGroupTheme,
  RadioPrimaryTheme,
  RadioGroupItemRootTheme,
} from '@kommo-crm/crm-react-ui-kit/RadioGroup';
import {
  Text,
  TextSecondaryLightTheme,
  TextPrimaryTheme,
} from '@kommo-crm/crm-react-ui-kit/Text';
import {
  TextArea,
  TextareaLightTheme,
} from '@kommo-crm/crm-react-ui-kit/TextArea';
import { Button, ButtonPrimaryTheme } from '@kommo-crm/crm-react-ui-kit/Button';
import { Label, LabelTheme } from '@kommo-crm/crm-react-ui-kit/Label';
import { Link, LinkPrimaryTheme } from '@kommo-crm/crm-react-ui-kit/Link';

import { ShowNotificationParams } from 'vendor/types/app';

import { i18n } from '@utils/i18n/i18n';

import {
  NotificationType,
  NotificationCreatorProps,
} from './NotificationCreator.types';

import * as s from './NotificationCreator.local.css';

const notificationTypes: NotificationType[] = [
  {
    name: 'Call',
    value: 'call',
  },
  {
    name: 'Error',
    value: 'error',
  },
];

const emptyNotification: ShowNotificationParams = {
  text: { text: '', header: '' },
  type: 'call',
};

export const NotificationCreator: FC<NotificationCreatorProps> = (props) => {
  const { onNotify, ...rest } = props;

  const [notification, setNotification] =
    useState<ShowNotificationParams>(emptyNotification);

  const groupId = useId();

  const handleTextChange =
    (field: 'text' | 'header') =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNotification((prev) => ({
        ...prev,
        text: {
          ...prev.text,
          [field]: e.target.value,
        },
      }));
    };

  const handleTypeChange = (value: string) => {
    setNotification((prev) => ({
      ...prev,
      type: value as ShowNotificationParams['type'],
    }));
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onNotify?.(e);
    setNotification(emptyNotification);

    APP.notifications.show_notification(notification);
  };

  const isButtonDisabled = !notification.text.text || !notification.text.header;

  return (
    <div className={s.notificationCreator} {...rest}>
      <div className={s.textWrapper}>
        <h3 className={s.heading}>{i18n('Notifications')}</h3>

        <Text size="l" theme={TextSecondaryLightTheme}>
          {i18n('You can read more about the notifications') + ' '}
          <Link
            theme={LinkPrimaryTheme}
            href="https://developers.kommo.com/docs/notification-center"
            target="_blank"
          >
            {i18n('here')}
          </Link>
        </Text>
      </div>

      <div className={s.formWrapper}>
        <Label
          theme={LabelTheme}
          text={
            <Text isEllipsis size="l" theme={TextPrimaryTheme}>
              {i18n('Notification header text')}
            </Text>
          }
        >
          <TextArea
            theme={TextareaLightTheme}
            onChange={handleTextChange('header')}
            value={notification.text.header}
            placeholder={i18n('Enter the notification header text here')}
            rows={2}
          />
        </Label>

        <Label
          theme={LabelTheme}
          text={
            <Text isEllipsis size="l" theme={TextPrimaryTheme}>
              {i18n('Notification text')}
            </Text>
          }
        >
          <TextArea
            theme={TextareaLightTheme}
            onChange={handleTextChange('text')}
            value={notification.text.text}
            placeholder={i18n('Enter the notification text here')}
            rows={2}
          />
        </Label>

        <Label
          theme={LabelTheme}
          text={
            <Text isEllipsis size="l" theme={TextPrimaryTheme}>
              {i18n('Select type of notification')}
            </Text>
          }
        >
          <RadioGroup
            name={`notification-type--${groupId}`}
            orientation="horizontal"
            theme={RadioGroupTheme}
            onChange={handleTypeChange}
            value={notification.type}
          >
            {notificationTypes.map((item) => (
              <RadioGroup.ItemRoot
                key={item.name}
                value={item.value}
                theme={RadioGroupItemRootTheme}
              >
                <Label
                  textPlacement="right"
                  theme={LabelTheme}
                  text={
                    <Text isEllipsis size="l" theme={TextPrimaryTheme}>
                      {i18n(item.name)}
                    </Text>
                  }
                >
                  <RadioGroup.Radio theme={RadioPrimaryTheme} />
                </Label>
              </RadioGroup.ItemRoot>
            ))}
          </RadioGroup>
        </Label>
      </div>

      <Button
        theme={ButtonPrimaryTheme}
        onClick={handleButtonClick}
        isDisabled={isButtonDisabled}
        className={s.button}
        title={isButtonDisabled ? i18n('Fill in the form fields') : undefined}
      >
        {i18n('Notify')}
      </Button>
    </div>
  );
};
