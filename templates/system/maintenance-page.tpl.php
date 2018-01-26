<?php

/**
 * @file
 * HTML template file for the maintenance page.
 */
?>
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

  <?php print $styles; ?>

  <?php if (isset($head_scripts)): ?>
    <?php print $head_scripts; ?>
  <?php endif; ?>

  <meta name="msapplication-TileImage" content="<?php print $base_theme_path ?>mstile-144x144.png" />
  <meta name="msapplication-TileColor" content="#009de0">
  <meta name="msapplication-square310x310logo" content="<?php print $base_theme_path ?>mstile-310x310.png" />
  <meta name="msapplication-wide310x150logo" content="<?php print $base_theme_path ?>mstile-310x150.png" />
  <meta name="msapplication-square150x150logo" content="<?php print $base_theme_path ?>mstile-150x150.png" />
  <meta name="msapplication-square70x70logo" content="<?php print $base_theme_path ?>mstile-70x70.png" />
  <link rel="apple-touch-icon" sizes="57x57" href="<?php print $base_theme_path ?>apple-touch-icon-57x57.png" />
  <link rel="apple-touch-icon" sizes="114x114" href="<?php print $base_theme_path ?>apple-touch-icon-114x114.png" />
  <link rel="apple-touch-icon" sizes="72x72" href="<?php print $base_theme_path ?>apple-touch-icon-72x72.png" />
  <link rel="apple-touch-icon" sizes="144x144" href="<?php print $base_theme_path ?>apple-touch-icon-144x144.png" />

<body class="<?php print $classes; ?>">

  <section class="top-section">
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
        </div>
      </div>
    </header>
  </section>

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
