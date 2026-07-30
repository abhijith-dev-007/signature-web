import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Run on everything except Payload admin/api, Next internals, and files
  matcher: ['/((?!api|admin|ping|_next|_payload|.*\\..*).*)'],
}
