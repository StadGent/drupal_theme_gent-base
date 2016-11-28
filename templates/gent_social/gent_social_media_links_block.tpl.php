<?php

/**
 * @file
 * Template file for the social media links.
 */
?>
<?php if ($links): ?>
<div class="gent-social__block-content island island--theta gent-social-global-links">
  <div class="island__bottom">
    <h3><?php print t('Follow us on:')?></h3>
    <ul class="social-list clearfix">
    <?php foreach ($links as $link): ?>
    <li>
      <a href="<?php print url($link['url'], array('absolute' => TRUE)); ?>" title="<?php print $types[$link['type']]; ?>"><i class="icon-<?php print drupal_html_class($link['type']); ?>"></i><span class="element-invisible"><?php print $types[$link['type']]; ?></span></a>
    </li>
    <?php endforeach; ?>
  </div>
</div>
<?php endif; ?>
