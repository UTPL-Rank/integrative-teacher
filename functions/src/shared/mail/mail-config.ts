import * as functions from 'firebase-functions';

/**
 * Expose mail configuration from the current running env
 * firebase functions:config:set nodemail.user="mail@utpl.edu.ec" nodemail.pass="pass"
 */
export class MailConfig {

    /**
     * Cache value of user
     */
    private static _user: string | null = null;

    /**
     * Default mail account to send emails
     */
    static get integratorEmail(): string {
        return this._user || (this._user = functions.config().nodemail.user);
    }

    /**
     * Cache value of password
     */
    private static _pass: string | null = null;

    /**
     * Password used to access the default mail account
     */
    static get integratorPassword(): string {
        return this._pass || (this._pass = functions.config().nodemail.pass);
    }

}