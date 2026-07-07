// Google reviews via Elfsight (Reviews-widget), site-breed getoond boven de footer.
// Vul hieronder de widget-id in (uit de Elfsight-embed: het deel na "elfsight-app-").
// Live Google-reviews zijn verifieerbaar; dit is geen verzonnen reviewscore.
//
// Voorbeeld embed van Elfsight:
//   <div class="elfsight-app-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" data-elfsight-app-lazy></div>
// Zet dan hieronder: const ELFSIGHT_REVIEWS_APP = "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX";
const ELFSIGHT_REVIEWS_APP = "";

export const hasGoogleReviews = Boolean(ELFSIGHT_REVIEWS_APP);

export function GoogleReviews() {
  if (!ELFSIGHT_REVIEWS_APP) return null;
  return (
    <section className="border-t border-slate-200 bg-white" aria-label="Google reviews">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-brand-900">
          Wat klanten over ons zeggen
        </h2>
        <div className="mt-6">
          <div className={`elfsight-app-${ELFSIGHT_REVIEWS_APP}`} data-elfsight-app-lazy />
        </div>
      </div>
    </section>
  );
}
