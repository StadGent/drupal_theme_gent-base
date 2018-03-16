<?php

/**
 * @file
 * Template file for the address block from Gent base tools.
 */
?>
<ul class="no-bullet-list">
  <?php foreach ($settings['pages'] as $i => $page): ?>
    <li class="milli">
      <?php print l($page['entity_label'], $page['path']); ?>
    </li>
  <?php endforeach; ?>
</ul>
