import type {
  EmailCodeStrategy,
  EmailLinkStrategy,
  LoadedClerk,
  OAuthStrategy,
  PasswordStrategy,
  PhoneCodeStrategy,
  ResetPasswordEmailCodeStrategy,
  ResetPasswordPhoneCodeStrategy,
  SamlStrategy,
  SignInStrategy,
  TicketStrategy,
  Web3Strategy,
} from '@clerk/types';

export type WithClerk<T> = { clerk: LoadedClerk } & T;
export type WithClient<T> = { client: LoadedClerk['client'] } & T;
export type WithParams<T> = { params: T };

export type SignInStrategyName = SignInStrategy | 'oauth' | 'web3';

// ====================== CLERKJS MODIFICATIONS ======================

/**
 * Notes:
 * The following interfaces were modified from the original clerkjs types as the originals weren't able to be appropriately narrowed.
 *   - `SignInCreateIdentifierOnlyParams` and `SignInCreateTransferOnlyParams`: `never` was added to `strategy`.
 *   - `SignInCreateOAuthParams` and `SignInCreateSamlParams` where identifier is required in one but not in the other.
 */

export interface SignInCreateOAuthParams {
  strategy: OAuthStrategy;
  redirectUrl: string;
  actionCompleteRedirectUrl?: string;
}

export interface SignInCreateSamlParams {
  // Split out from OAuthStrategy for better typing
  strategy: SamlStrategy;
  redirectUrl: string;
  actionCompleteRedirectUrl?: string;
  identifier: string;
}

export interface SignInCreateTicketParams {
  strategy: TicketStrategy;
  ticket: string;
}

export interface SignInCreatePasswordParams {
  strategy: PasswordStrategy;
  password: string;
  identifier: string;
}

export interface SignInCreateEmailLinkParams {
  strategy: EmailLinkStrategy;
  identifier: string;
  redirectUrl?: string;
}

export interface SignInCreateIdentifierOnlyParams {
  strategy?: never; // Added to fix typing issue
  identifier: string;
}

export interface SignInCreateTransferParams {
  transfer?: boolean;
}

export interface SignInCreateTransferOnlyParams extends SignInCreateTransferParams {
  strategy?: never; // Added to fix typing issue
}

export interface SignInCreateWeb3Params {
  strategy: Web3Strategy;
  identifier: string;
}

export interface SignInCreateCodeParams {
  strategy: PhoneCodeStrategy | EmailCodeStrategy | ResetPasswordEmailCodeStrategy | ResetPasswordPhoneCodeStrategy;
  identifier: string;
}

export type FixedSignInCreateParams = (
  | SignInCreateOAuthParams
  | SignInCreateSamlParams
  | SignInCreateTicketParams
  | SignInCreatePasswordParams
  | SignInCreateCodeParams
  | SignInCreateWeb3Params
  | SignInCreateEmailLinkParams
  | SignInCreateIdentifierOnlyParams
  | SignInCreateTransferOnlyParams
) &
  SignInCreateTransferParams;
