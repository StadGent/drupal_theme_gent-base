<?php

/**
 * @file
 * Overridden region template for the footer bottom region.
 */
?>
<?php if ($content): ?>
  <?php print $content; ?>
<?php endif; ?>

  <div class="brand__footer__wrapper l-full">
    <p class="brand__footer__sub">
      <span class="brand__footer__sub__text"><?php print t('In cooperation with')?></span>
      <span class="brand__footer__sub__logo"><a href="https://district09.gent">District09</a></span>
    </p>
  </div>
