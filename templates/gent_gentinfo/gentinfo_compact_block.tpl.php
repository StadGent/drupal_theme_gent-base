<?php
/**
 * @file
 * Template file for the compact block
 */
?>

<?php if ($settings['phone']): ?>
  <div class="phone"><?php print t('Telephone')?> : <?php print check_plain($settings['phone']) ?></div>
<?php endif; ?>

<?php if ($settings['email']): ?>
  <div class="email"><?php print t('Email')?> : <?php print l($settings['email'], 'mailto:' . $settings['email'], array('absolute' => TRUE));?></div>
<?php endif; ?>

<?php if ($settings['button_enabled']): ?>
  <div class="button">
    <a href="<?php print url($settings['button_link']) ?>""><?php print check_plain($settings['button_text']) ?></a>
  </div>
<?php endif; ?>

