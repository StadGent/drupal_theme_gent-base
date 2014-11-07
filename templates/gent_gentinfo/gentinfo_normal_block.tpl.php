<?php
/**
 * @file
 * Template file for the normal block
 */
?>

<?php if ($settings['intro']): ?>
  <p class="column"><?php print filter_xss($settings['intro'], array('p', 'strong', 'a', 'li', 'ul'))?></p>
<?php endif; ?>

<ul class="no-bullet-list column address">
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
</ul>

<ul class="no-bullet-list contact">
<?php if ($settings['contact_enabled']): ?>
	<li>
		 <a href="<?php print url($settings['contact_link']) ?>" class="btn btn--medium btn--delta"><span class="btn-centered"><i class="icon-link"></i><?php print check_plain($settings['contact_label']) ?></span></a>
	</li>
<?php endif; ?>

</ul>