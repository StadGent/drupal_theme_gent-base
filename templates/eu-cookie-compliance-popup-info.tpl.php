<?php

/**
 * @file
 * Overridden EU cookie compliance popup template.
 *
 * When overriding this template it is important to note that jQuery will use
 * the following classes to assign actions to buttons:
 *
 * agree-button      - agree to setting cookies
 * find-more-button  - link to an information page
 *
 * Variables available:
 * - $message:  Contains the text that will be display whithin the pop-up
 * - $agree_button: Contains agree button title
 * - $disagree_button: Contains disagree button title
 */
?>
<div>
  <div class ="popup-content info">
    <div id="popup-text">
      <?php print $message ?>
    </div>
    <div id="popup-buttons">
      <input type="submit" class="form-submit agree-button" value="<?php print $agree_button; ?>">
      <input type="submit" class="form-submit find-more-button" value="<?php print $disagree_button; ?>">
    </div>
  </div>
</div>
