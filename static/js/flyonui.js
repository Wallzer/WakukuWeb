/**
 * FlyonUI JavaScript Library
 * A lightweight UI component library for modern web applications
 */

const FlyonUI = (function() {
  'use strict';
  
  // Initialize the library
  function init() {
    initDropdowns();
    initModals();
    initTabs();
    initTooltips();
    initAlerts();
  }
  
  // Dropdown functionality
  function initDropdowns() {
    const dropdownToggles = document.querySelectorAll('[data-flyon-toggle="dropdown"]');
    
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const targetId = this.getAttribute('data-flyon-target');
        const target = document.querySelector(targetId);
        
        if (target) {
          target.classList.toggle('hidden');
        }
      });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
      document.querySelectorAll('.flyon-dropdown-menu:not(.hidden)').forEach(dropdown => {
        dropdown.classList.add('hidden');
      });
    });
  }
  
  // Modal functionality
  function initModals() {
    const modalToggles = document.querySelectorAll('[data-flyon-toggle="modal"]');
    
    modalToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('data-flyon-target');
        const target = document.querySelector(targetId);
        
        if (target) {
          target.classList.remove('hidden');
          document.body.classList.add('overflow-hidden');
        }
      });
    });
    
    // Close modal functionality
    document.querySelectorAll('[data-flyon-dismiss="modal"]').forEach(closeBtn => {
      closeBtn.addEventListener('click', function() {
        const modal = this.closest('.flyon-modal');
        if (modal) {
          modal.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        }
      });
    });
    
    // Close modal when clicking on backdrop
    document.querySelectorAll('.flyon-modal').forEach(modal => {
      modal.addEventListener('click', function(e) {
        if (e.target === this) {
          this.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        }
      });
    });
  }
  
  // Tabs functionality
  function initTabs() {
    const tabGroups = document.querySelectorAll('[data-flyon-tabs]');
    
    tabGroups.forEach(group => {
      const tabs = group.querySelectorAll('[data-flyon-tab]');
      
      tabs.forEach(tab => {
        tab.addEventListener('click', function() {
          // Deactivate all tabs
          tabs.forEach(t => {
            t.classList.remove('flyon-tab-active');
            const panel = document.querySelector(t.getAttribute('data-flyon-tab'));
            if (panel) {
              panel.classList.add('hidden');
            }
          });
          
          // Activate current tab
          this.classList.add('flyon-tab-active');
          const panel = document.querySelector(this.getAttribute('data-flyon-tab'));
          if (panel) {
            panel.classList.remove('hidden');
          }
        });
      });
      
      // Activate first tab by default
      if (tabs.length > 0) {
        tabs[0].click();
      }
    });
  }
  
  // Tooltip functionality
  function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-flyon-tooltip]');
    
    tooltipElements.forEach(element => {
      const tooltipText = element.getAttribute('data-flyon-tooltip');
      
      element.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'flyon-tooltip';
        tooltip.textContent = tooltipText;
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
        tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
      });
      
      element.addEventListener('mouseleave', function() {
        const tooltip = document.querySelector('.flyon-tooltip');
        if (tooltip) {
          tooltip.remove();
        }
      });
    });
  }
  
  // Alert dismissal
  function initAlerts() {
    document.querySelectorAll('[data-flyon-dismiss="alert"]').forEach(closeBtn => {
      closeBtn.addEventListener('click', function() {
        const alert = this.closest('.flyon-alert');
        if (alert) {
          alert.remove();
        }
      });
    });
  }
  
  // Public API
  return {
    init: init,
    initDropdowns: initDropdowns,
    initModals: initModals,
    initTabs: initTabs,
    initTooltips: initTooltips,
    initAlerts: initAlerts
  };
})();

// Initialize FlyonUI when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', FlyonUI.init);