<?php

/**
 * @file
 * Page template file.
 */
?>
<?php if ($tabs && $top_tabs_enabled): ?>
  <div class="tabs--top sticky sticky-999">
    <?php print render($tabs); ?>
  </div>
<?php endif; ?>

<div class="wrapper">
  <div class="container-wrapper">
    <div class="header-block-wrapper">
      <section class="top-section">
        <nav class="holder holder--alpha padding">
          <div class="l-row">
            <div class="brand">
              <div class="brand__logo">
                <a href="<?php print $front_page; ?>">
                  <div class="brand__logo__inner">
                      <span>
                        <?php print $site_title; ?>
                      </span>
                  </div>
                </a>
              </div>
              <div class="brand__tagline">
                <a href="<?php print $front_page; ?>">
                  <div class="brand__tagline__inner">
                      <span>
                        <?php print $site_title; ?>
                      </span>
                  </div>
                </a>
              </div>
              <div class="thema_title">
                <div class="vertical-align">
                  <span><?php print $site_name; ?></span>
                </div>
              </div>
            </div>

            <?php print render($page['top_menu']); ?>
          </div>
        </nav>

        <?php if ($breadcrumb): ?>
          <section class="holder">
            <div class="l-row breadcrumb-wrapper">
              <?php print $breadcrumb; ?>
              <?php if (!empty($readspeaker)): ?>
                <div class="readspeaker v2">
                  <?php print render($readspeaker); ?>
                </div>
              <?php endif; ?>
            </div>
          </section>
        <?php endif; ?>

        <header class="site__header">
          <div class="mask ratio--header">
            <?php if ($header_image): ?>
              <div class="header__background">
                <?php print render($header_image); ?>
              </div>

              <div class="site__header__image__title">
                <div class="l-row">
                  <?php if ($page['site_name']): ?>
                    <?php print render($page['site_name']); ?>
                  <?php else: ?>
                    <!-- RSPEAK_START -->
                    <h1><?php print $title; ?></h1>
                    <!-- RSPEAK_STOP -->
                  <?php endif; ?>
                </div>
              </div>
            <?php else: ?>
              <div class="site__header__normal__title">
                <div class="l-row">
                  <!-- RSPEAK_START -->
                  <h1><?php print $title; ?></h1>
                  <!-- RSPEAK_STOP -->
                </div>
              </div>
            <?php endif; ?>
          </div>
          <?php if (!empty($header_image['#title'])): ?>
            <div class="l-row">
              <p class="caption"><?php print check_plain($header_image['#title']); ?></p>
            </div>
          <?php endif; ?>
        </header>
      </section>

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
    </div>
    <!-- END header-block-wrapper -->

    <section class="holder <?php print $is_front ? 'padding--huge' : 'padding--big' ?>">
      <div class="l-row">
        <?php if (!$page['content_top']): ?>
          <!-- RSPEAK_START -->
          <?php print $messages; ?>
          <!-- RSPEAK_STOP -->
        <?php endif; ?>
        <?php if ($title): ?>
          <header <?php if ($is_front): ?>class="l-full"<?php endif; ?>>
            <!-- RSPEAK_START -->
            <?php print render($title_prefix); ?>

            <?php if ($is_front): ?>
              <h2 class="h1 hT"><?php print $title; ?></h2>
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

        <?php if ($action_links): ?>
          <ul class="action-links">
            <?php print render($action_links); ?>
          </ul>
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
        <div class="site__footer__content l-row padding--big">
          <?php print render($page['footer_bottom']); ?>
        </div>
      </footer>
    <?php endif; ?>
  </div>
  <!-- END container-wrapper -->
</div>
<!-- END wrapper -->
