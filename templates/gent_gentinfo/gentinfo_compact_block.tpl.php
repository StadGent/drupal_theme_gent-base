<?php
/**
 * @file
 * Template file for the compact block
 */
?>

<ul class="no-bullet-list">
<?php if ($settings['phone']): ?>
	<li>
		<a href="tel:<?php print $settings['phone_full']; ?>" itemprop="telephone"><i class="icon-phone"></i><?php print check_plain($settings['phone']) ?></a>
	</li>
<?php endif; ?>

<?php if ($settings['email']): ?>
	<li>
		<a href="<?php print url('mailto:' . $settings['email'], array('absolute' => TRUE));?>"><i class="icon-email"></i><?php print $settings['email'] ?></a>
	</li>
<?php endif; ?>

<?php if ($settings['contact_enabled']): ?>
	<li>
		<a href="<?php print url($settings['contact_link']) ?>"><i class="icon-link"></i><?php print check_plain($settings['contact_label']) ?></a>
	</li>
<?php endif; ?>

<?php if ($settings['button_enabled']): ?>
	<li>
		<a href="<?php print url($settings['button_link']) ?>" class="btn btn--medium btn--delta olark-toggle"><i class="icon-bubble"></i><?php print check_plain($settings['button_label']) ?></a>
	</li>
<?php endif; ?>
</ul>
