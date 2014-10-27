<?php
/**
 * @file
 * Template file for the address block
 */
?>

<ul class="no-bullet-list">
	<li>
		<a href="#">
			<?php if ($settings['address_name']): ?><span>Stad Gent<br><?php endif; ?>
			<?php if ($settings['address_street']) : ?><span itemprop="streetAddress"><?php print check_plain($settings['address_street']) ?></span><br><?php endif; ?>
			<?php if ($settings['address_location']) : ?><span itemprop="addressLocality"><?php print check_plain($settings['address_location']) ?></span><?php endif; ?>
		</a>
	</li>

	<?php foreach ($settings['pages'] as $i => $page): ?>
  <li class="milli <?php if ($i == 0): ?>list__divider<?php endif;  ?>">
  <?php print l($page['entity_label'], $page['path']); ?>
  </li>
  <?php endforeach; ?>

</ul>
