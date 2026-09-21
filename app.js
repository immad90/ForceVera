window.dataLayer=window.dataLayer||[];
const params=new URLSearchParams(location.search);
const attribution={};['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid'].forEach(k=>{if(params.get(k)) attribution[k]=params.get(k)});
if(Object.keys(attribution).length) sessionStorage.setItem('fv_attribution',JSON.stringify(attribution));
document.querySelectorAll('[data-cta]').forEach(el=>el.addEventListener('click',()=>{
  window.dataLayer.push({event:'cta_click',cta_name:el.dataset.cta,page_path:location.pathname,...attribution});
}));

// Homepage: add the ForceVera product walkthrough without changing inner pages.
const industryStrip=document.querySelector('.industry-strip');
const whySection=document.querySelector('#why');
if(industryStrip&&whySection){
  const howToStyles=document.createElement('link');
  howToStyles.rel='stylesheet';
  howToStyles.href='how-to.css';
  document.head.appendChild(howToStyles);

  const howTo=document.createElement('section');
  howTo.className='howto-section';
  howTo.id='how-it-works';
  howTo.innerHTML=`
    <div class="wrap">
      <div class="howto-head">
        <div class="howto-head-copy">
          <div class="kicker">How to use ForceVera</div>
          <h2>From shift planning to <span>verified field activity.</span></h2>
          <p>See how operations teams use ForceVera to plan coverage, deploy officers, verify attendance and patrol activity, capture incidents, and keep clients informed from one connected platform.</p>
        </div>
        <div class="howto-badge"><i></i> Product walkthrough</div>
      </div>
      <div class="howto-grid">
        <div class="howto-video-card">
          <div class="howto-video-top"><span class="live-dot"></span> ForceVera Product Overview <span>Security workforce. Simplified.</span></div>
          <div class="howto-video-frame">
            <video id="forceveraOverview" controls playsinline preload="metadata" aria-label="ForceVera product walkthrough">
              <source src="assets/ForceVera_Product_Overview.mp4?v=2" type="video/mp4">
              Your browser does not support HTML5 video.
            </video>
            <div class="howto-video-fallback" id="forceveraVideoFallback"><div><strong>ForceVera walkthrough</strong><span>The product video is being prepared for playback.</span></div></div>
          </div>
          <div class="howto-video-note"><b>What you’ll see:</b> command center, scheduling, attendance verification, QR patrols, duties, incident reporting, analytics and client visibility.</div>
        </div>
        <div class="howto-steps">
          <article class="howto-step"><div class="howto-step-num">01</div><h3>Monitor Operations</h3><p>Start from the command center to review live coverage, attendance, incidents and field activity.</p></article>
          <article class="howto-step"><div class="howto-step-num">02</div><h3>Schedule & Deploy</h3><p>Create shifts, assign officers to sites, publish schedules and keep coverage organized.</p></article>
          <article class="howto-step"><div class="howto-step-num">03</div><h3>Verify Attendance</h3><p>Use location-aware clock in/out workflows to confirm officers are where they should be.</p></article>
          <article class="howto-step"><div class="howto-step-num">04</div><h3>Verify Patrols & Duties</h3><p>Track QR checkpoints, required duties, timestamps and photo evidence from the field.</p></article>
          <article class="howto-step"><div class="howto-step-num">05</div><h3>Capture Incidents</h3><p>Document incidents with structured reports, details and supporting media for faster follow-up.</p></article>
          <article class="howto-step"><div class="howto-step-num">06</div><h3>Review & Share</h3><p>Turn operational activity into reports, analytics and authorized client visibility.</p></article>
        </div>
      </div>
      <div class="howto-flow"><span><b>1</b>Plan</span><span><b>2</b>Deploy</span><span><b>3</b>Verify</span><span><b>4</b>Report</span><span><b>5</b>Review</span></div>
    </div>`;
  industryStrip.insertAdjacentElement('afterend',howTo);

  const nav=document.querySelector('.navlinks');
  if(nav&&!nav.querySelector('[href="#how-it-works"]')){
    const link=document.createElement('a');
    link.href='#how-it-works';
    link.textContent='How It Works';
    const featuresLink=nav.querySelector('a[href="features.html"]');
    nav.insertBefore(link,featuresLink||null);
  }

  const heroOverview=document.querySelector('[data-cta="hero_video"]');
  if(heroOverview){
    heroOverview.href='#how-it-works';
    heroOverview.innerHTML='◉ Watch Product Overview';
  }

  const video=document.getElementById('forceveraOverview');
  const fallback=document.getElementById('forceveraVideoFallback');
  if(video){
    video.addEventListener('play',()=>window.dataLayer.push({event:'video_play',video_name:'forcevera_product_overview',page_path:location.pathname,...attribution}),{once:true});
    video.addEventListener('ended',()=>window.dataLayer.push({event:'video_complete',video_name:'forcevera_product_overview',page_path:location.pathname,...attribution}),{once:true});
    video.addEventListener('error',()=>{if(fallback)fallback.style.display='grid'});
  }
}
