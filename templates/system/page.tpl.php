<?php if ($tabs && $top_tabs_enabled): ?>
  <div class="tabs--top sticky sticky-999">
    <?php print render($tabs); ?>
  </div>
<?php endif; ?>

<!--[if lt IE 9]>
<div class="alert-box">
  <p>You are using an <strong>outdated</strong> browser. Please <a
    href="http://browsehappy.com/">upgrade your browser</a> or <a
    href="http://www.google.com/chromeframe/?redirect=true">activate
    Google Chrome Frame</a> to improve your experience.</p>
</div>
<![endif]-->
<section class="top-section">
  <nav class="holder holder--alpha padding">
    <div class="l-row">
      <?php if ($top_menu_render_method == GENT_BASE_TOP_MENU_RENDER_METHOD_REGION): ?>
        <?php if ($page['top_menu']): ?>
          <div class="login-widget nav nav--login">
            <?php print render($page['top_menu']); ?>
          </div>
        <?php endif; ?>
      <?php elseif ($top_menu_render_method == GENT_BASE_TOP_MENU_RENDER_METHOD_USER_LINKS): ?>
        <ul class="login-widget nav nav--login">
          <li><?php print $logged_in ? l(t('Logout'), 'user/logout') : l(t('Login'), 'user/login') ?></li>
          <li><?php print l(t('Mijn Gent'), '') ?></li>
        </ul>
      <?php elseif ($top_menu_render_method == GENT_BASE_TOP_MENU_RENDER_METHOD_EMPTY): ?>
        <?php // Do nothing... ?>
      <?php endif; ?>

      <?php if ($page['search']): ?>
        <?php print render($page['search']); ?>
      <?php endif; ?>
    </div>
  </nav>

  <header class="site__header">
    <div class="brand">
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

    <div class="mask <?php print $is_front ? 'ratio--home' : 'ratio--header'; ?>">
      <?php if ($header_image): ?>
        <div class="header__background" style="background-image:url('<?php print $header_image; ?>');"></div>
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

        <?php if (!empty($readspeaker)): ?>
          <div class="readspeaker">
            <?php print render($readspeaker); ?>
          </div>
        <?php endif; ?>
      </div>
  </header>
</section>
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
      <!-- RSPEAK_START -->
      <?php print $messages; ?>
      <?php print render($page['content_top']); ?>
      <!-- RSPEAK_STOP -->
    </div>
  </section>
<?php endif; ?>

<section class="holder <?php print $is_front ? 'padding--huge' : 'padding--big' ?>">
  <div class="l-row">
    <?php if (!$page['content_top']): ?>
    <!-- RSPEAK_START -->
    <?php print $messages; ?>
    <!-- RSPEAK_STOP -->
    <?php endif;?>
    <?php if ($title): ?>
    <header <?php if ($is_front): ?>class="l-full"<?php endif; ?>>
      <!-- RSPEAK_START -->
      <?php print render($title_prefix); ?>

      <?php if ($is_front): ?>
        <h2 class="h1 hT"><?php print $title; ?></h2>
      <?php else: ?>
        <h1 id="page-title"><?php print $title; ?></h1>
      <?php endif; ?>

      <?php print render($title_suffix); ?>
      <!-- RSPEAK_STOP -->
    </header>
    <?php endif; ?>

    <?php if ($tabs && !$top_tabs_enabled): ?>
      <div class="tabitems content-tabs <?php if ($tabs['#secondary']): ?>with-secondary<?php endif; ?>">
        <?php print render($tabs); ?>
      </div>
    <?php endif; ?>

    <!-- RSPEAK_START -->
    <?php print render($page['content']); ?>
    <!-- RSPEAK_STOP -->

    <!-- RSPEAK_START -->
    <?php print render($page['sidebar']); ?>
    <!-- RSPEAK_STOP -->

    <?php print $feed_icons; ?>
  </div>
</section>

<?php if ($page['content_bottom']): ?>
  <section class="holder padding--big background--alpha border-top border-bottom">
    <div class="l-row">
      <!-- RSPEAK_START -->
      <?php print render($page['content_bottom']); ?>
      <!-- RSPEAK_STOP -->
    </div>
  </section>
<?php endif; ?>

<?php if ($page['footer_top']): ?>
  <section class="holder padding--huge">
    <div class="l-row">
      <!-- RSPEAK_START -->
      <?php print render($page['footer_top']); ?>
      <!-- RSPEAK_STOP -->
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
