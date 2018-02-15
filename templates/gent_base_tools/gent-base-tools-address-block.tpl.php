<?php

/**
 * @file
 * Template file for the address block from Gent base tools.
 */
?>
<ul class="no-bullet-list">
  <li>
    <?php if ($settings['address_name']): ?>
      <span>Stad Gent</span><br>
    <?php endif; ?>
    <?php if ($settings['address_street']): ?>
      <span itemprop="streetAddress"><?php print check_plain($settings['address_street']) ?></span><br>
    <?php endif; ?>
    <?php if ($settings['address_location']): ?>
      <span itemprop="addressLocality"><?php print check_plain($settings['address_location']) ?></span>
    <?php endif; ?>
  </li>
</ul>
