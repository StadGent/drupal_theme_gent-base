<?php if ($tabs && $logged_in): ?>
<div class="tabs--top">
  <?php print render($tabs); ?>
</div>
<?php endif;?>

<!--[if lt IE 7]>
<div class="alert-box">
  <p>You are using an <strong>outdated</strong> browser. Please <a
    href="http://browsehappy.com/">upgrade your browser</a> or <a
    href="http://www.google.com/chromeframe/?redirect=true">activate
    Google Chrome Frame</a> to improve your experience.</p>
</div>
<![endif]-->

<nav class="holder holder--alpha padding <?php if ($tabs && $logged_in): ?>is-tabs-enabled<?php endif;?>">
	<div class="l-row">
		<ul class="login-widget nav nav--login">
			<li><?php print $logged_in ? l(t('Logout'), 'user/logout') : l(t('Login'), 'user/login') ?></li>
			<li><?php print l(t('Mijn Gent'), '') ?></li>
		</ul>

		<div class="search-widget">
		  <?php print render($page['search']); ?>

		  <!--
			<input type="search" placeholder="Wat wil je vinden?" />
			<input type="submit" value="Zoek" class="btn btn--medium btn--alpha" />
			-->
		</form>
	</div>
</nav>

<div class="brand <?php if ($tabs && $logged_in): ?>is-tabs-enabled<?php endif;?>">
	<div class="l-row padding--big">
		<div class="brand__logo">
			<div class="brand__logo__inner">
<!-- 				<span> -->
					<?php print $site_name ?>
				</span>
			</div>
		</div>
		<div class="brand__tagline">
			<div class="brand__tagline__inner">
				<span>
					<?php print $site_name ?>
				</span>
			</div>
		</div>
	</div>
</div>

<header class="holder site__header">
	<div class="mask ratio--header">
  	<?php if ($header_image): ?>
  		<?php print $header_image; ?>
  	<?php endif; ?>
		<span class="site__header__image__gradient"></span>
		<div class="site__header__image__title">
			<div class="l-row">
				<h1><?php print $site_title;?></h1>
			</div>
		</div>
	</div>

	<ul class="service-links">
  <?php if ($readspeaker): ?>
    <li class="service-link readspeaker">
      <?php print render($readspeaker); ?>
    </li>
  <?php endif; ?>
  </ul>
</header>


	<section class="holder padding--big background--alpha border-bottom">
	<div class="l-row">
	 <?php print render($page['content_top']); ?>

	 <!--
		<div class="l-third island island--alpha js-height">
	<h2 class="h1 hT">Openingsuren</h2>
	<ul class="link-list">
		<li>
			<a href="#">Bibliotheek</a>
		</li>
		<li>
			<a href="#">Bioscopen</a>
		</li>
		<li>
			<a href="#">Musea</a>
		</li>
		<li>
			<a href="#">Sporthal</a>
		</li>
		<li>
			<a href="#">Theater jeugdtoneel</a>
		</li>
		<li>
			<a href="#">Vrije Tijd</a>
		</li>
		<li class="link-list__more">
			<a href="#">Alle openingsuren</a>
		</li>
	</ul>
</div>
-->


	<!--
		<div class="l-third island island--alpha js-height">
	<h2 class="h1 hT">Diensten en info</h2>
	<ul class="link-list">
		<li>
			<a href="#">Wat wil het stadsbestuur de komende jaren doen en met welke financiering</a>
		</li>
		<li>
			<a href="#">Meerjarenplan en budget_NA</a>
		</li>
		<li>
			<a href="#">Meerjarenplan en budget_VOOR</a>
		</li>
		<li>
			<a href="#">Beleidsplan gezondheid</a>
		</li>
		<li>
			<a href="#">Nieuw stadsmagazine online</a>
		</li>
	</ul>
</div>
-->

	<!--
		<div class="l-third island island--epsilon js-height">
	<h2 class="h1 hT">Gentinfo</h2>
	<p>Sed molestie augue sit amet leo consequat posuere. Vestibulum ante ipsum primis in faucibus orci luctus.</p>
	<ul class="no-bullet-list">
		<li>
			<a href="tel:092101010" itemprop="telephone"><i class="icon-phone"></i>09 210 10 10</a>
		</li>
		<li>
			<a href="mailto:gentinfo@gent.be"><i class="icon-email"></i>gentinfo@gent.be</a>
		</li>
		<li>
			<a href="#" class="btn btn--medium btn--delta"><i class="icon-bubble"></i>Online chat</a>
		</li>
	</ul>
</div>
-->

	</div>
</section>



<main class="site-content-holder">
<!-- -->
<nav class="holder site-breadcrumb-holder">
  <div class="row site-breadcrumb-row">
    <div class="site-breadcrumb col">
      <?php print $breadcrumb; ?>
    </div>
  </div>
</nav>
<div class="holder main-holder">
<div class="row main-row">
  <div class="col system-info">
    <?php print $messages; ?>
    <?php print render($page['help']); ?>
    <?php if (!$logged_in && $tabs): ?>
    <div class="tabitems">
      <?php print render($tabs);?>
    </div>
    <?php endif; ?>
    <?php if ($action_links): ?>
      <ul class="action-links"><?php print render($action_links); ?></ul>
    <?php endif; ?>
  </div>
</div>
<div class="row main-row">
  <div class="col">
  <?php if ($title && !$is_front): ?>
  <!-- RSPEAK_START -->
  <h1 id="page-title"><?php print $title; ?></h1>
  <!-- RSPEAK_STOP -->
  <?php endif; ?>
  <?php if (!empty($page['highlighted'])) : ?>
      <?php print render($page['highlighted']); ?>
  <?php endif; ?>
  <?php print render($page['sidebar_first']); ?>
  <?php print render($page['sidebar_second']); ?>
  <!-- RSPEAK_START -->
  <?php print render($page['content']); ?>
  <!-- RSPEAK_STOP -->
  <?php print $feed_icons; ?>
  </div>
</div>
</div>
</div>
</main>
<footer class="holder footer-holder">
  <div class="row footer-row">
    <div class="footer col">
      <div class="row">
        <div class="fmedium-4 large-3 col">
          <?php if (!empty($page['footer_first'])): ?>
            <?php print render($page['footer_first']); ?>
          <?php endif;?>
        </div>
        <div class="medium-4 large-3 col">
          <?php if (!empty($page['footer_second'])): ?>
            <?php print render($page['footer_second']); ?>
          <?php endif;?>
        </div>
        <div class="medium-3 col last-col">
          <?php if (!empty($page['footer_third'])): ?>
            <?php print render($page['footer_third']); ?>
          <?php endif;?>
        </div>
      </div>
    </div>
  </div>
</footer>
</div>
<!-- Make responsive website responsive in IE7 & 8 -->
<!--[if IE 8 | IE 7]>
<script src="bower_components/respond/dest/respond.min.js"></script><![endif]-->