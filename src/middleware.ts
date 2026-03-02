import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // සපෝට් කරන භාෂා
  locales: ['en', 'de', 'fr'],
 
  // URL එකේ මුකුත් නැතිනම් ඉංග්‍රීසි වලට යවන්න
  defaultLocale: 'en',

  // මේක true කළාම prefix එක නැතුව ආවත් locale එකට අරන් යනවා
  localePrefix: 'always'
});
 
export const config = {
  // Static files සහ API අතහැර අනිත් හැම එකටම මේක වැඩ කරන්න ඕනේ
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};