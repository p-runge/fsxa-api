import { Logger, LogLevel } from './Logger'
import { FSXAApi } from '..'

export type FSXAApiSingletonInitOptions = {
  logLevel?: LogLevel
  enableEventStream?: boolean
}

export class FSXAApiSingleton {
  private static _api: FSXAApi
  private static _logger: Logger

  public static init(api: FSXAApi, options: FSXAApiSingletonInitOptions = {}) {
    if (!this._api) {
      this._logger = new Logger(options.logLevel || LogLevel.ERROR, 'FSXAApiSingleton')
      this._api = api
      this._logger.debug('FSXA-Api initialized with api:', api)

      if (typeof options.enableEventStream !== 'undefined') {
        this._api.enableEventStream(options.enableEventStream)
      }

      return this._api
    }

    this._logger.info('The FSXA-Api has already been initialized - the api will NOT be initialized again!')

    return this._api
  }

  public static get instance() {
    if (!this._api) {
      throw new Error('The FSXA-Api needs to be initialized. Call .init() first.')
    }

    return this._api
  }
}
