<?php
/**
 * @file
 * Default template for the authentication bar.
 */
?>
<div id="gent-auth-bar" class="<?php print $classes; ?>">
  <div class="bar-wrapper">
    <?php if ($login_active) : ?>
      <div class="login element-hidden">
        <a href="<?php print $login_url; ?>" class="picture-wrapper">
          <div class="name"><?php print $login_text; ?></div>
          <div class="picture no-profile"><img src="<?php print $default_picture_url; ?>" /></div>
        </a>
      </div>
    <?php endif; ?>

    <div class="logged-in element-hidden">
      <div class="picture-wrapper">
        <div class="name">{firstname}</div>
        <div class="picture has-profile">{picture}</div>
        <div class="picture no-profile"><img src="<?php print $default_picture_url; ?>" /></div>
      </div>

      <div class="popup-wrapper">
        <div class="popup">
          <?php if ($links) : ?>
            <div class="middle">
              <?php print drupal_render($links); ?>
            </div>
          <?php endif; ?>

          <div class="footer">
            <a href="<?php print $logout_url; ?>"><?php print t('Logout'); ?></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
