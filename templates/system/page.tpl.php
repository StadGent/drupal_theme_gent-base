<?php if ($tabs && $logged_in): ?>
  <div class="tabs--top">
    <?php print render($tabs); ?>
  </div>
<?php endif; ?>

<!--[if lt IE 7]>
<div class="alert-box">
  <p>You are using an <strong>outdated</strong> browser. Please <a
    href="http://browsehappy.com/">upgrade your browser</a> or <a
    href="http://www.google.com/chromeframe/?redirect=true">activate
    Google Chrome Frame</a> to improve your experience.</p>
</div>
<![endif]-->

<nav class="holder holder--alpha padding <?php if ($tabs && $logged_in): ?>is-tabs-enabled<?php endif; ?>">
  <div class="l-row">
    <ul class="login-widget nav nav--login">
      <li><?php print $logged_in ? l(t('Logout'), 'user/logout') : l(t('Login'), 'user/login') ?></li>
      <li><?php print l(t('Mijn Gent'), '') ?></li>
    </ul>

    <?php if ($page['search']): ?>
      <?php print render($page['search']); ?>
    <?php endif; ?>
  </div>
</nav>

<div class="brand <?php if ($tabs && $logged_in): ?>is-tabs-enabled<?php endif; ?>">
  <div class="l-row padding--big">
    <div class="brand__logo">
      <a href="<?php print $front_page ?>">
        <div class="brand__logo__inner">
          <span>
            Gent.be
          </span>
        </div>
      </a>
    </div>
    <div class="brand__tagline">
      <a href="<?php print $front_page ?>">
        <div class="brand__tagline__inner">
          <span>
            Gent.be
          </span>
        </div>
      </a>
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
        <?php if ($page['site_name']): ?>
          <?php print render($page['site_name']); ?>
        <?php else: ?>
          <h1><?php print $site_name; ?></h1>
        <?php endif; ?>
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

<?php if ($breadcrumb): ?>
  <section class="holder">
    <div class="l-row">
      <?php print $breadcrumb; ?>
    </div>
  </section>
<?php endif; ?>

<?php if ($page['content_top']): ?>
  <section class="holder padding--big background--alpha border-bottom">
    <div class="l-row">
      <?php print render($page['content_top']); ?>
    </div>
  </section>
<?php endif; ?>

<section class="holder <?php print $is_front ? 'padding--huge' : 'padding--big' ?>">
  <div class="l-row">

    <?php print $messages; ?>

    <header <?php if ($is_front): ?>class="l-full"<?php endif; ?>>
      <?php if ($title && !$is_front): ?>
        <!-- RSPEAK_START -->
        <h2 class="h1 hT"><?php print $title; ?></h2>
        <!-- RSPEAK_STOP -->
      <?php endif; ?>
    </header>

    <?php if (!$logged_in && $tabs): ?>
      <div class="tabitems">
        <?php print render($tabs); ?>
      </div>
    <?php endif; ?>

    <!-- RSPEAK_START -->
    <?php print render($page['content']); ?>
    <!-- RSPEAK_STOP -->

    <?php print $feed_icons; ?>
  </div>
</section>

<?php if ($page['content_bottom']): ?>
  <section class="holder padding--big background--alpha border-top border-bottom">
    <div class="l-row">
      <?php print render($page['content_bottom']); ?>
    </div>
  </section>
<?php endif; ?>

<?php if ($page['footer_top']): ?>
  <section class="holder padding--huge">
    <div class="l-row">
      <?php print render($page['footer_top']); ?>
    </div>
  </section>
<?php endif; ?>

<?php if ($page['footer']): ?>
  <section class="holder padding--huge background--gamma">
    <div class="l-row">
      <?php print render($page['footer']); ?>
    </div>
  </section>
<?php endif; ?>

<?php if ($page['footer_bottom']): ?>
  <footer class="holder site__footer background--beta">
    <div class="l-row padding--big">
      <?php print render($page['footer_bottom']); ?>
    </div>
  </footer>
<?php endif; ?>
