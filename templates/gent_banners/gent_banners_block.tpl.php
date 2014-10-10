<?php foreach ($items as $item): ?>
  <div class="l-third island island--alpha js-height">
    <h2 class="h1 hT"><?php print $item['title'] ?></h2>
    <?php print render($item['content']); ?>
  </div>
<?php endforeach; ?>


