<?php
/**
 * @file
 * Template file for the social media links
 */
?>

<?php if ($links): ?>
<div class="l-fourth-alt island island--theta">
  <div class="island__bottom js-equal">
    <h3><?php print t('Follow us on:')?></h3>
    <ul class="social-list">
    <?php foreach ($links as $link): ?>
    <li>
      <a class="list-<?php print drupal_html_class($link['type']) ?>" href="<?php print url($link['url'], array('absolute' => TRUE))?>"><?php print $types[$link['type']]; ?></a>
    </li>
    <?php endforeach; ?>
  </div>
</div>
<?php endif; ?>
