<!DOCTYPE html>
<html lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>>
<head>
  <title><?php print $head_title; ?></title>
  <?php print $head; ?>
  <?php print $styles; ?>
  <?php print $scripts; ?>

  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta http-equiv="cleartype" content="on">

  <!-- Mobile settings http://t.co/dKP3o1e -->
  <meta name="HandheldFriendly" content="True">
  <meta name="MobileOptimized" content="320">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Custom modernizr build: http://modernizr.com — load other JavaScript at the end of document -->
  <script src="<?php print base_path() . path_to_theme(); ?>/js/modernizr.custom.js"></script>

  <!-- Enable HTML5 in IE<9 -->
  <!--[if lt IE 9  & (!IEMobile)]><script src="<?php print base_path() . path_to_theme(); ?>/js/html5shiv.js"></script><![endif]-->

<body<?php print $attributes;?>>

  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>

</body>
</html>
