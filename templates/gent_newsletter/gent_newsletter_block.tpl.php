<?php
/**
 * Generic newslette block template. Override me per site.
 */
?>
<div class="l-fourth-alt island island--theta js-height">
	<div class="island__top mask js-equal">
			<img src="img/jpg/flowers-small.jpg">
		</div>
		<div class="island__bottom js-equal">
			<h2 class="hN"><?php print t("Don't miss our next newsletter!") ?></h2>
		</div>
	</div>
	<div class="l-half-alt island island--iota js-height">
		<h3>
			<?php print t("Receive our newsletter") ?>
		</h3>
		<ul class="list">
			<li><?php print t("Newsletter reason 1") ?></li>
			<li><?php print t("Newsletter reason 2") ?></li>
			<li><?php print t("Newsletter reason 3") ?></li>
		</ul>
		<?php print render($form) ?>
</div>