```json title="/locales/en/common.json"
{
  "pages": {
    "login": {
      "title": "Sign in to your account",
      "signin": "Sign in",
      "signup": "Sign up",
      "divider": "or",
      "fields": {
        "email": "Email",
        "password": "Password"
      },
      "errors": {
        "validEmail": "Invalid email address",
        "requiredEmail": "Email is required",
        "requiredPassword": "Password is required"
      },
      "buttons": {
        "submit": "Login",
        "forgotPassword": "Forgot password?",
        "noAccount": "Don’t have an account?",
        "rememberMe": "Remember me"
      }
    },
    "forgotPassword": {
      "title": "Forgot your password?",
      "fields": {
        "email": "Email"
      },
      "errors": {
        "validEmail": "Invalid email address",
        "requiredEmail": "Email is required"
      },
      "buttons": {
        "submit": "Send reset instructions"
      }
    },
    "register": {
      "title": "Sign up for your account",
      "fields": {
        "email": "Email",
        "password": "Password"
      },
      "errors": {
        "validEmail": "Invalid email address",
        "requiredEmail": "Email is required",
        "requiredPassword": "Password is required"
      },
      "buttons": {
        "submit": "Register",
        "haveAccount": "Have an account?"
      }
    },
    "updatePassword": {
      "title": "Update password",
      "fields": {
        "password": "New Password",
        "confirmPassword": "Confirm new password"
      },
      "errors": {
        "confirmPasswordNotMatch": "Passwords do not match",
        "requiredPassword": "Password required",
        "requiredConfirmPassword": "Confirm password is required"
      },
      "buttons": {
        "submit": "Update"
      }
    },
    "error": {
      "info": "You may have forgotten to add the {{action}} component to {{resource}} resource.",
      "404": "Sorry, the page you visited does not exist.",
      "resource404": "Are you sure you have created the {{resource}} resource.",
      "backHome": "Back Home"
    }
  },
  "actions": {
    "list": "List",
    "create": "Create",
    "edit": "Edit",
    "show": "Show"
  },
  "buttons": {
    "create": "Create",
    "save": "Save",
    "logout": "Logout",
    "delete": "Delete",
    "edit": "Edit",
    "cancel": "Cancel",
    "confirm": "Are you sure?",
    "filter": "Filter",
    "clear": "Clear",
    "refresh": "Refresh",
    "show": "Show",
    "undo": "Undo",
    "import": "Import",
    "clone": "Clone",
    "notAccessTitle": "You don't have permission to access"
  },
  "warnWhenUnsavedChanges": "Are you sure you want to leave? You have unsaved changes.",
  "notifications": {
    "success": "Successful",
    "error": "Error (status code: {{statusCode}})",
    "undoable": "You have {{seconds}} seconds to undo",
    "createSuccess": "Successfully created {{resource}}",
    "createError": "There was an error creating {{resource}} (status code: {{statusCode}})",
    "deleteSuccess": "Successfully deleted {{resource}}",
    "deleteError": "Error when deleting {{resource}} (status code: {{statusCode}})",
    "editSuccess": "Successfully edited {{resource}}",
    "editError": "Error when editing {{resource}} (status code: {{statusCode}})",
    "importProgress": "Importing: {{processed}}/{{total}}"
  },
  "loading": "Loading",
  "tags": {
    "clone": "Clone"
  },
  "dashboard": {
    "title": "Dashboard"
  },
  "posts": {
    "posts": "Posts",
    "fields": {
      "id": "Id",
      "title": "Title",
      "category": "Category",
      "status": {
        "title": "Status",
        "published": "Published",
        "draft": "Draft",
        "rejected": "Rejected"
      },
      "content": "Content",
      "createdAt": "Created At"
    },
    "titles": {
      "create": "Create Post",
      "edit": "Edit Post",
      "list": "Posts",
      "show": "Show Post"
    }
  },
  "table": {
    "actions": "Actions"
  },
  "documentTitle": {
    "default": "refine",
    "suffix": " | Refine",
    "post": {
      "list": "Posts | Refine",
      "show": "#{{id}} Show Post | Refine",
      "edit": "#{{id}} Edit Post | Refine",
      "create": "Create new Post | Refine",
      "clone": "#{{id}} Clone Post | Refine"
    }
  },
  "autoSave": {
    "success": "saved",
    "error": "auto save failure",
    "loading": "saving...",
    "idle": "waiting for changes"
  }
}
```
