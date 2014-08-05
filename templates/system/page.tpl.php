<?php if (render($tabs) && $user->uid != 0) : ?>
  <div class="tabs-top">
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
<div<?php print $attributes; ?> <?php if (render($tabs)) : ?> class="top-holder-wrapper-extratabs"<?php endif; ?>>
  <div class="top-holder<?php if (render($tabs)) : ?> top-holder-admin-extratabs<?php endif; ?>">
    <div class="contentWidth top-row">
      <a href="/" class="top-index">
        <span class="top-index-logo"></span>
        <strong class="top-index-p"><?php print $site_name; ?></strong>
      </a>
      <ul class="top-nav">
        <?php if ($user->uid == 0) { ?>
          <li><a href="/user/login">Aanmelden</a></li>
          <?php
        }
        else {
          ?>
          <li><a href="/user/logout">Afmelden</a></li>
        <?php } ?>
      </ul>
      <div class="top-search site-search">
        <?php print render($page['search']); ?>
      </div>
    </div>
  </div>


  <main class="site-content-holder">
    <div class="top intro-holder" <?php print !empty($inner_styles['intro-holder']) ? $inner_styles['intro-holder'] : ''; ?>>
      <header class="contentWidth intro-row">
        <p class="intro-logo logo">
          <a href="/"><img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" /></a>
        </p>
        <div class="intro">
          <h1 class="intro-title intro-text"><?php print $deelsite_title; ?></h1>
        </div>
      </header>
    </div>
    <nav class="holder site-breadcrumb-holder">
      <div class="contentWidth site-breadcrumb-row">
        <div class="site-breadcrumb col">
          <?php print $breadcrumb; ?>
        </div>
      </div>
    </nav>
    <div class="holder main-holder">
      <div class="contentWidth main-row">
        <div class="col system-info">
          <?php print $messages; ?>
          <?php print render($page['help']); ?>
          <?php if ($user->uid == 0 && render($tabs)): ?>
            <div class="tabitems">
              <?php print render($tabs); ?>
            </div>
          <?php endif; ?>
          <?php if ($action_links): ?>
            <ul class="action-links"><?php print render($action_links); ?></ul>
          <?php endif; ?>
        </div>
      </div>
      <div class="contentWidth main-row">
        <div class="col">
          <?php if ($title && !drupal_is_front_page()): ?>
            <h1 id="page-title"><?php print $title; ?></h1>
          <?php endif; ?>
          <?php if (!empty($page['highlighted'])) : ?>
            <?php print render($page['highlighted']); ?>
          <?php endif; ?>
          <?php print render($page['sidebar_first']); ?>
          <?php print render($page['sidebar_second']); ?>
          <?php print render($page['content']); ?>
          <?php print $feed_icons; ?>
        </div>
      </div>
    </div>
  </main>
  <footer class="holder footer-holder">
    <div class="contentWidth footer-row">
      <div class="footer col">
        <div class="contentWidth">
          <div class="medium-4 large-3 col">
            <?php if (!empty($page['footer_first'])): ?>
              <?php print render($page['footer_first']); ?>
            <?php endif; ?>
          </div>
          <div class="medium-4 large-3 col">
            <?php if (!empty($page['footer_second'])): ?>
              <?php print render($page['footer_second']); ?>
            <?php endif; ?>
          </div>
          <div class="medium-3 col last-col">
            <?php if (!empty($page['footer_third'])): ?>
              <?php print render($page['footer_third']); ?>
            <?php endif; ?>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>
<!-- Make responsive website responsive in IE7 & 8 -->
<!--[if IE 8 | IE 7]>
<script src="bower_components/respond/dest/respond.min.js"></script><![endif]-->