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
	<?php if ($settings['terms_page']): ?>
	<li class="milli list__divider">
		<?php print l($settings['terms_page']['entity_label'], $settings['terms_page']['path']); ?>
	</li>
	<?php endif; ?>
	<?php if ($settings['disclaimer_page']): ?>
	<li class="milli">
		<?php print l($settings['disclaimer_page']['entity_label'], $settings['disclaimer_page']['path']); ?>
	</li>
	<?php endif; ?>
</ul>
