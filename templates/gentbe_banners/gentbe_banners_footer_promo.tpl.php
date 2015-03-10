<?php
/**
 * @file
 * Template file for the footer promo
 */
?>
<?php if ($image): ?>
<div class="l-fourth-alt island island--theta">
  <div class="island__top mask js-equal">
    <div class="promo">
      <?php print l($image, $url, array('html' => true)); ?>
    </div>
  </div>
</div>
<?php endif; ?>
