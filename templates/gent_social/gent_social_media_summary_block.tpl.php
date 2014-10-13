<?php
/**
 * @file
 * Template file for the social media summary block
 */
?>
<?php if ($links): ?>
<ul class="no-bullet-list">
<?php foreach ($links as $link): ?>
	<li>
		<a href="<?php print url($link['url'], array('absolute' => TRUE))?>"><i class="icon-<?php print drupal_html_class($link['type']) ?>"></i><?php print check_plain($link['display']); ?></a>
	</li>
<?php endforeach; ?>
</ul>
<?php endif; ?>