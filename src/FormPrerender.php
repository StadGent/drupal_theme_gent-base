<?php

namespace Drupal\gent_base;

use Drupal\Core\Render\Element;
use Drupal\Core\Security\TrustedCallbackInterface;

/**
 * Provides a prerender callback for forms.
 */
class FormPrerender implements TrustedCallbackInterface {

  /**
   * {@inheritdoc}
   */
  public static function trustedCallbacks() {
    return [
      'prerenderForm',
    ];
  }

  /**
   * Prerender callback for forms.
   *
   * @param array $form
   *   The complete form array.
   *
   * @return array
   *   The altered form.
   */
  public static function prerenderForm(array $form) {
    $input_counts = 0;

    static::loopElements($form, $input_counts);

    $form['#has_inputs'] = $input_counts > 0;

    return $form;
  }

  /**
   * Loop an array of form elements.
   *
   * @param array $elements
   *   Th elements to loop.
   * @param int $input_counts
   *   Input counter.
   *
   * @SuppressWarnings(PHPMD.CyclomaticComplexity)
   */
  protected static function loopElements(array &$elements, &$input_counts = 0) {
    foreach (Element::children($elements) as $key) {
      $element = &$elements[$key];

      // Skip any none-arrays or inaccessible elements.
      if (!is_array($element) || (isset($element['#access']) && !$element['#access'])) {
        continue;
      }

      // Loop any nested elements.
      static::loopElements($element, $input_counts);

      // Skip to the next element if this isn't a form element.
      if (!isset($element['#type'])) {
        continue;
      }

      // Apply the element specific alter function.
      switch ($element['#type']) {
        case 'checkboxes':
        case 'radios':
          static::alterCheckboxesAndRadiosElement($element);
          break;

        case 'datetime':
          static::alterDatetimeElement($element);
          break;

        case 'webform_checkboxes_other':
        case 'webform_radios_other':
          static::alterWebformCheckboxesAndRadiosOtherElement($element);
          break;

        case 'webform_select_other':
          static::alterWebformSelectOtherElement($element);
          break;

        case 'webform_email_confirm':
          static::alterWebformEmailConfirmElement($element);
          break;

        case 'webform_image_file':
        case 'webform_document_file':
          static::alterWebformFileElement($element);
          break;

        case 'webform_markup':
          static::alterWebformMarkupElement($element);
          break;
      }

      // Increment the input count if the element has a value.
      if (isset($element['#value'])) {
        $input_counts++;
      }
    }
  }

  /**
   * Alter a checkbox or radios element.
   *
   * @param array $element
   *   The form element.
   */
  protected static function alterCheckboxesAndRadiosElement(array &$element) {
    $element['#has_columns'] = TRUE;

    foreach (array_keys($element['#options']) as $key) {
      $element[$key]['#parent_type'] = $element['#type'];
      $element[$key]['#in_fieldset'] = TRUE;
    }
  }

  /**
   * Alter a datetime element.
   *
   * @param array $element
   *   The form element.
   */
  protected static function alterDatetimeElement(array &$element) {
    $element['#has_row'] = TRUE;

    foreach (['date', 'time'] as $key) {
      $element[$key]['#stacked'] = TRUE;
    }
  }

  /**
   * Alter a Webform checkboxes or radios other element.
   *
   * @param array $element
   *   The form element.
   */
  protected static function alterWebformCheckboxesAndRadiosOtherElement(array &$element) {
    $element['#has_columns'] = TRUE;
    $element['other']['#parent_type'] = $element['#type'];
    $element['other']['#in_fieldset'] = TRUE;
  }

  /**
   * Alter a Webform select other element.
   *
   * @param array $element
   *   The form element.
   */
  protected static function alterWebformSelectOtherElement(array &$element) {
    $element['#has_columns'] = TRUE;
    $element['select']['#parent_type'] = $element['#type'];
    $element['select']['#in_fieldset'] = TRUE;
    $element['other']['#parent_type'] = $element['#type'];
    $element['other']['#in_fieldset'] = TRUE;
  }

  /**
   * Alter a Webform email confirmation element.
   *
   * @param array $element
   *   The form element.
   */
  protected static function alterWebformEmailConfirmElement(array &$element) {
    $element['#has_columns'] = TRUE;

    foreach (Element::children($element) as $key) {
      $element[$key]['#parent_type'] = $element['#type'];
      $element[$key]['#in_fieldset'] = TRUE;
    }
  }

  /**
   * Alter a Webform file upload element.
   *
   * @param array $element
   *   The form element.
   */
  protected static function alterWebformFileElement(array &$element) {
    if (isset($element['#help'])) {
      $element['#description'] = $element['#help'];
      unset($element['#help']);
    }
  }

  /**
   * Alter a Webform markup element.
   *
   * @param array $element
   *   The form element.
   */
  protected static function alterWebformMarkupElement(array &$element) {
    $element['#theme_wrappers'] = [];
  }

}
