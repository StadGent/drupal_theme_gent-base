<div class="l-page">

  <div class="top-holder">
    <ul class="top-nav">
      <?php if ($user->uid == 0): ?>
        <li><?php print l(t('Log in'), 'user/login'); ?></li>
      <?php else: ?>
        <li><?php print l(t('Log out'), 'user/logout'); ?></li>
      <?php endif; ?>
    </ul>
    <div class="top-search site-search">
      <?php print render($page['search']); ?>
    </div>
  </div>

  <div class="top holder intro-holder">

    <header class="l-header" role="banner">
      <div class="row top-row">
        <a href="<?php print $front_page; ?>" class="top-index">
          <?php if ($logo): ?>
            <span class="top-index-logo">
              <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" class="site-logo"><img
                  src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>"/></a>
            </span>
          <?php endif; ?>
          <?php if ($site_name): ?>
            <h1 class="site-name">
              <?php print $site_name; ?>
            </h1>
          <?php endif; ?>
        </a>
      </div>
    </header>
  </div>

  <div class="holder main-holder">
    <div class="l-main">
      <div class="l-content" role="main">
        <?php print render($page['highlighted']); ?>

        <?php if ($breadcrumb): ?>
          <nav class="holder site-breadcrumb-holder">
            <div class="site-breadcrumb">
              <?php print $breadcrumb; ?>
            </div>
          </nav>
        <?php endif; ?>

        <div class="row main-row">
          <div class="col">
            <a id="main-content"></a>
            <?php print render($tabs); ?>
            <?php print render($title_prefix); ?>
            <?php if ($title): ?>
              <h1><?php print $title; ?></h1>
            <?php endif; ?>
            <?php print render($title_suffix); ?>
            <?php print $messages; ?>
            <?php print render($page['help']); ?>
            <?php if ($action_links): ?>
              <ul class="action-links"><?php print render($action_links); ?></ul>
            <?php endif; ?>
            <?php print render($page['content']); ?>
            <?php print $feed_icons; ?>
          </div>
        </div>
      </div>
    </div>

    <?php print render($page['sidebar_first']); ?>
    <?php print render($page['sidebar_second']); ?>
  </div>

  <div class="holder footer-holder">
    <footer class="l-footer" role="contentinfo">
      <?php print render($page['footer']); ?>
    </footer>
  </div>
</div>
