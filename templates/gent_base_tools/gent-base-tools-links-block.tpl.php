<?php

/**
 * @file
 * Template file for the address block from Gent base tools.
 */
?>
<ul class="no-bullet-list">
  <?php foreach ($settings['pages'] as $i => $page): ?>
    <?php // @codingStandardsIgnoreStart ?>
    <li class="milli <?php if ($i == 0): print 'list__divider'; endif; ?>">
    <?php // @codingStandardsIgnoreEnd ?>
      <?php print l($page['entity_label'], $page['path']); ?>
    </li>
  <?php endforeach; ?>
</ul>
