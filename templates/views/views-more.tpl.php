<?php

/**
 * @file
 * Overridden Views more template.
 *
 * Themes the more link.
 * - $view: The view object.
 * - $more_url: the url for the more link.
 * - $link_text: the text for the more link.
 * @ingroup views_templates
 */
?>
<footer class="l-full l-center padding-top--big">
  <a href="<?php print $more_url ?>" class="morelink">
    <?php print $link_text; ?>
  </a>
</footer>
