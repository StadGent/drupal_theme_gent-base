<?php
/**
 * Generic newslette block template. Override me per site.
 */
?>
<div class="l-fourth-alt island island--theta js-height">

  <?php if (isset($image)): ?>
		<div class="island__top mask js-equal" style="background-image:url('<?php print $image_url; ?>');"></div>
	<?php endif; ?>

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

  <?php if ($more_link): ?>
    <div class="newsletters-more"><?php print $more_link; ?></div>
  <?php endif; ?>

</div>
