<?php
/**
 * @file
 * Template file for the normal block
 */
?>

<?php if ($settings['intro']): ?>
  <?php print filter_xss($settings['intro'], 'p strong a li ul')?>
<?php endif; ?>

<ul class="no-bullet-list">
	<li>
		<a href="tel:092101010" itemprop="telephone"><i class="icon-phone"></i>09 210 10 10</a>
	</li>
	<li>
		<a href="mailto:gentinfo@gent.be"><i class="icon-email"></i>gentinfo@gent.be</a>
	</li>

</ul>


<ul class="no-bullet-list">
<?php if ($settings['phone']): ?>
	<li>
		<a href="tel:<?php print check_plain(preg_replace("/[^0-9]/", '', $settings['phone'])); ?>" itemprop="telephone"><i class="icon-phone"></i><?php print check_plain($settings['phone']) ?></a>
	</li>
<?php endif; ?>

<?php if ($settings['email']): ?>
	<li>
		<a href="<?php print l($settings['email'], 'mailto:' . $settings['email'], array('absolute' => TRUE));?>"><i class="icon-email"></i><?php print $settings['email'] ?></a>
	</li>
<?php endif; ?>

<?php if ($settings['button_enabled']): ?>
	<li>
		<a href="<?php print url($settings['button_link']) ?>" class="btn btn--medium btn--delta"><i class="icon-bubble"></i><?php print check_plain($settings['button_text']) ?></a>
	</li>
<?php endif; ?>
</ul>
