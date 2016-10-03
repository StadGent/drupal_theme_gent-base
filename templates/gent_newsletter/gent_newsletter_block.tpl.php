<?php
/**
 * @file
 * Generic newsletter block template. Override me per site.
 */
?>
<div class="gent-newsletter__block-content__image island island--theta js-height clearfix">
  <?php if ($image_url): ?>
    <div class="island__top mask js-equal" style="background-image:url('<?php print $image_url; ?>');"></div>
  <?php endif; ?>
  <?php if ($caption): ?>
    <div class="island__bottom js-equal">
      <h2 class="hN"><?php print $caption; ?></h2>
    </div>
  <?php endif; ?>
</div>
<div class="gent-newsletter__block-content__text island island--iota js-height">
  <h3>
    <?php print $title; ?>
  </h3>
    <?php print $description; ?>
  <?php print render($form); ?>
  <?php if (!empty($more_link)): ?>
    <div class="newsletters-more"><?php print $more_link; ?></div>
  <?php endif; ?>
</div>
