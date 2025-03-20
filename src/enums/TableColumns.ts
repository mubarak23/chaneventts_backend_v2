
export enum BankAccountColumns {
  USER_ID = "user_id",
  BANK_NAME = "bank_name",
  ACCOUNT_NAME = "account_name",
  ACCOUNT_NUMBER = "account_number",
}



export enum SavedProductColumns {
  USER_ID = "user_id",
  PRODUCT_ID = "product_id",
}

export enum EventColumns {
  UUID = "event_uuid",
  NAME = "name",
  DESCRIPTION = "description",
  LOCATION = "location",
  EVENT_OWNER = "event_owner",
  EVENT_EMAIL = "event_email",
  EVENT_ONCHAIN_ID = "event_onchain_id",
  REQUIRED_APPROVAL = "required_approval",
  OPEN_FOR_REGISTRATION = "open_for_registration",
  EVENT_CAPACITY = "event_capacity",
  TICKET = "ticket",
  EVENT_TYPE = "event_type",
  EVENT_MODE = "event_mode",
  TICKET_AMOUNT = "ticket_amount",
  EVENT_START_DATE = "event_start_date",
  EVENT_END_DATE = "event_end_date",
  EVENT_IMAGE = "event_image",
}

export enum EventRegistrationColumns {
  UUID = "event_registration_uuid",
  EVENT_ID = "event_id",
  EMAIL_ADDRESS = "email_address",
  USER_ADDRESS = "user_address",
  IS_ACTIVE = "is_active",
}

export enum RsvpEventColumns {
  UUID = "event_registration_uuid",
  EVENT_ID = "event_id",
  ATTENDEE_ADDRESS = "attendee_address",
}



export enum UserColumns {
  UUID = "user_uuid",

  FIRST_NAME = "first_name",
  LAST_NAME = "last_name",
  USERNAME = "username",
  EMAIL_ADDRESS = "email_address",
  PHONE_NUMBER = "phone_number",
  MSISDN = "msisdn",
  PASSWORD_HASH = "password_hash",
  ROLE = "role",
  PHOTO = "photo",
  
}

export enum TicketColumns {
  UUID = "ticket_uuid",
  USER_ID = "user_id",
  NAME = "name",
  DESCRIPTION = "description",
  CUSTOMER_EMAIL = "customer_email",
  STATUS = "status",
  IMAGES = "images"
}

export enum CronRunColumns {
  UUID = "cron_run_uuid",
  NAME = "name",
  IS_RUNNING = "is_running",
  LAST_RUN_START = "last_run_start",
  LAST_RUN_END = "last_run_end",
}
export enum WalletColumns {
  USER_ID = "user_id",
  WALLET_BALANCE_MINOR = "wallet_balance_minor",
  CURRENCY = "currency",
  TYPE = "type",
}



export const TableColumns: any = {
  ID: "id",
  IS_ENABLED: "is_enabled",
  CREATED_AT: "created_at",
  UPDATED_AT: "updated_at",
};

export default TableColumns;
