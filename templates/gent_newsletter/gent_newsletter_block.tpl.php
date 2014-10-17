<?php
/**
 * Generic newslette block template. Override me per site.
 */
?>
<div class="l-fourth-alt island island--theta js-height">
	<div class="island__top mask js-equal">
	  <?php if ($sfeerbeeld): ?>
			 <?php print render($sfeerbeeld);?>
	  <?php else: ?>
	     <img src="<?php print base_path() . path_to_theme() ?>/img/jpg/flowers-small.jpg">
	  <?php endif; ?>
	</div>
	<?php if ($caption): ?>
	<div class="island__bottom js-equal">
		<h2 class="hN"><?php print $caption ?></h2>
	</div>
	<?php endif; ?>
</div>

<div class="l-half-alt island island--iota js-height">
		<h3>
			<?php print $title ?>
		</h3>
    <?php print $description; ?>

		<?php print render($form) ?>
</div>