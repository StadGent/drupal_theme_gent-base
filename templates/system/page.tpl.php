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
			<li><?php print l(t('Mijn Gent'), 'todo') ?></li>
		</ul>

		<form class="search-widget">
		<!--
			<input type="search" placeholder="Wat wil je vinden?" />
			<input type="submit" value="Zoek" class="btn btn--medium btn--alpha" />
    -->
			<?php print render($page['search']); ?>
		</form>
	</div>
</nav>

<div class="brand <?php if ($tabs && $logged_in): ?>is-tabs-enabled<?php endif;?>">
	<div class="l-row padding--big">
		<div class="brand__logo">
			<div class="brand__logo__inner">
				<span>
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

	<ul class="service-links">
  <?php if ($readspeaker): ?>
    <li class="service-link readspeaker">
      <?php print render($readspeaker); ?>
    </li>
  <?php endif; ?>
  </ul>
</div>

<header class="holder site__header">
	<div class="mask ratio--header">
		<img src="img/jpg/schapestal.jpg">
		<span class="site__header__image__gradient"></span>
		<div class="site__header__image__title">
			<div class="l-row">
				<h1><?php print $deelsite_title;?></h1>
			</div>
		</div>
	</div>
</header>









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