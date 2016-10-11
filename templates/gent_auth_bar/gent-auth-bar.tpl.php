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
          <span class="name"><?php print $login_text; ?></span>
          <span class="picture no-profile hidden-mobile"><img src="<?php print $default_picture_url; ?>" /></span>
        </a>
      </div>
    <?php endif; ?>

    <div class="logged-in element-hidden">
      <div class="name-wrapper hidden-mobile">
        <a href="<?php print $profile_url; ?>" class="name has-profile">{firstname}</a>
        <span class="name no-profile">{firstname}</span>
      </div>

      <div class="picture-wrapper">
        <div class="picture has-profile">{picture}</div>
        <div class="picture no-profile"><img src="<?php print $default_picture_url; ?>" /></div>
      </div>

      <div class="popup-wrapper">
        <div class="arrow has-profile"></div>
        <div class="arrow no-profile"></div>
        <div class="popup">
          <?php if ($links) : ?>
            <?php print drupal_render($links); ?>
          <?php endif; ?>

          <div class="footer">
            <a href="<?php print $logout_url; ?>"><?php print t('Logout'); ?></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
