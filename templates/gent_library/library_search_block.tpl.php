<div class="library-search-box island island--zeta">
  <form accept-charset="UTF-8" id="library-search" method="get" action="<?php print $url ?>">
    <div class="island__body clearfix">
      <label for="location-name"><?php print t('Search in the catalog') ?></label>
      <input type="text" class="prefix--medium" maxlength="60" size="60" value="" name="<?php print $query_argument ?>" id="location-name" placeholder="<?php print t('Enter a searchterm') ?>">
      <input type="submit" class="btn btn--medium btn--alpha postfix--medium" value="<?php print t('Search') ?>" id="edit-submit">
    </div>
  </form>
</div>