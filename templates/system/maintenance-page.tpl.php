<!DOCTYPE html>
<html lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>">
<head>
  <title><?php print $head_title; ?></title>

  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta http-equiv="cleartype" content="on" />
  <?php print $head; ?>
  <meta name="HandheldFriendly" content="True" />
  <meta name="MobileOptimized" content="320" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <link href="//fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,400italic" rel="stylesheet" type="text/css" />

  <?php print $styles; ?>

  <?php if (isset($head_scripts)): ?>
    <?php print $head_scripts; ?>
  <?php endif; ?>

  <meta name="msapplication-TileImage" content="<?php print $base_theme_path ?>mstile-144x144.png" />
  <meta name="msapplication-TileColor" content="#007db3">
  <meta name="msapplication-square310x310logo" content="<?php print $base_theme_path ?>mstile-310x310.png" />
  <meta name="msapplication-wide310x150logo" content="<?php print $base_theme_path ?>mstile-310x150.png" />
  <meta name="msapplication-square150x150logo" content="<?php print $base_theme_path ?>mstile-150x150.png" />
  <meta name="msapplication-square70x70logo" content="<?php print $base_theme_path ?>mstile-70x70.png" />
  <link rel="apple-touch-icon" sizes="57x57" href="<?php print $base_theme_path ?>apple-touch-icon-57x57.png" />
  <link rel="apple-touch-icon" sizes="114x114" href="<?php print $base_theme_path ?>apple-touch-icon-114x114.png" />
  <link rel="apple-touch-icon" sizes="72x72" href="<?php print $base_theme_path ?>apple-touch-icon-72x72.png" />
  <link rel="apple-touch-icon" sizes="144x144" href="<?php print $base_theme_path ?>apple-touch-icon-144x144.png" />

<body<?php print $attributes;?>>

  <!--[if lt IE 9]>
  <div class="alert-box">
    <p>You are using an <strong>outdated</strong> browser. Please <a
      href="http://browsehappy.com/">upgrade your browser</a> or <a
      href="http://www.google.com/chromeframe/?redirect=true">activate
      Google Chrome Frame</a> to improve your experience.</p>
  </div>
  <![endif]-->

  <section class="top-section maintenance-page">
    <header class="site__header">
      <div class="brand">
        <div class="l-row padding--big">
          <div class="brand__logo">
            <a href="<?php print $front_page ?>">
              <div class="brand__logo__inner">
              <span>
                Stad.gent
              </span>
              </div>
            </a>
          </div>
          <div class="brand__tagline">
            <a href="<?php print $front_page ?>">
              <div class="brand__tagline__inner">
              <span>
                Stad.gent
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
                <h1><?php print $site_name; ?></h1>
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

  <section class="holder padding--big">
    <div class="l-row">

      <?php print $messages; ?>

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

      <!-- RSPEAK_START ---->
      <?php print $content; ?>
      <!-- RSPEAK_STOP -->

    </div>
  </section>

</body>
</html>

