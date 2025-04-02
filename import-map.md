# Import Map for Shared UI Components

This document provides a mapping of categorized import statements for every file in the `shared/src/ui/components` directory. The imports are grouped into three categories:

- **Category A (Types, Utils, Libs, Hooks):** Import statements that include one of the keywords `types`, `utils`, `libs`, or `hooks` in their module path.
- **Category B (ShadcnUI):** Import statements that refer to shadcnui (none found in our scan).
- **Category C (Direct Imports):** Relative import statements starting with `./` or `../`.

---

## Root-level Files

### File: team-switcher.tsx
- **Category A:** None found.
- **Category B:** None found.
- **Category C:** None found.

### File: search-input.tsx
- **Category A:** None found.
- **Category B:** None found.
- **Category C:**
  - `import { Button } from './ui/button';`

### File: nav-user.tsx
- **Category A:** None found.
- **Category B:** None found.
- **Category C:** None found.

### File: nav-projects.tsx
- **Category A:** None found.
- **Category B:** None found.
- **Category C:** None found.

### File: nav-main.tsx
- **Category A:** None found.
- **Category B:** None found.
- **Category C:** None found.

### File: mode-toggle.tsx
- **Category A:** None found.
- **Category B:** None found.
- **Category C:** None found.

### File: icons.tsx
- **Category A:** None found.
- **Category B:** None found.
- **Category C:** None found.

### File: form-card-skeleton.tsx
- **Category A:** None found.
- **Category B:** None found.
- **Category C:**
  - `import { Card, CardContent, CardHeader } from './ui/card';`
  - `import { Skeleton } from './ui/skeleton';`

### File: file-uploader.tsx
- **Category A:**
  - `import { useControllableState } from '@/hooks/use-controllable-state';`
  - `import { cn, formatBytes } from '@/lib/utils';`
- **Category B:** None found.
- **Category C:** None found.

### File: breadcrumbs.tsx
- **Category A:**
  - `import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';`
- **Category B:** None found.
- **Category C:** None found.

### File: AppTab.tsx
- **Category A:** None found.
- **Category B:** None found.
- **Category C:** None found.

### File: index.ts
- **No categorized import statements found.**

---

## Subdirectories

### Directory: filters

#### File: period-filter/date-range-picker.tsx
- **Category A:**
  - `import { cn } from '@/lib/utils';`
  - `import { useDebounce } from '@/hooks/use-debounce';`
- **Category B:** None found.
- **Category C:** None found.

#### File: deep/period-filter/BasePeriodFilter.tsx
- **Category A:**
  - `import { cn } from '@/lib/utils';`
- **Category B:** None found.
- **Category C:** None found.

#### File: deep/date-range-fitler.tsx
- **Category A:**
  - `import { cn } from '@/lib/utils';`
- **Category B:** None found.
- **Category C:** None found.

#### File: deep/filter-wrapper.tsx
- **Category A:**
  - `import { cn } from '@/lib/utils';`
- **Category B:** None found.
- **Category C:** None found.

#### File: chat/PeriodFilter.tsx
- **Category A:** None found.
- **Category B:** None found.
- **Category C:**
  - `import { DateRangePicker } from './DateRangePicker';`

---

### Directory: layout

#### File: user-nav.tsx (in layout)
- **Category A:**
  - `import { ILoginUser, IUserProfile } from '@/types/login-models';`
  - `import { getFullName } from '@/utils/helpers/common-helpers';`
  - `import { useLink } from '@/hooks/useLink';`
- **Category B:** None found.
- **Category C:** None found.

#### File: side-bar-component/nav-items/all-nav-items.ts
- **Category A:**
  - `import { UserRole } from '@/types/api-calls/backend-enums';`
- **Category C:**
  - `import { ISideNavItem, ISideNavItemGroup } from '../nav-types';`

#### File: side-bar-component/nav-items/report-nav-items.ts
- **Category A:**
  - `import { UserRole } from '@/types/api-calls/backend-enums';`
- **Category C:**
  - `import { ISideNavItem } from '../nav-types';`

#### File: side-bar-component/nav-user.tsx (in layout)
- **Category A:**
  - `import { ILoginUser, IUserProfile } from '@/types/login-models';`
  - `import { getFullName } from '@/utils/helpers/common-helpers';`
  - `import { useLink } from '@/hooks/useLink';`
- **Category B:** None found.
- **Category C:** None found.

#### File: side-bar-component/NavBarRenderer.tsx
- **Category A:**
  - `import { UserRole } from '@/types/api-calls/backend-enums';`
- **Category C:**
  - `import { ISideNavItem, ISideNavItemGroup } from './nav-types';`

#### File: side-bar-component/nav-types.ts
- **Category A:**
  - `import { UserRole } from '@/types/api-calls/backend-enums';`
- **Category C:** None found.

#### File: page-wrapper.tsx (in layout)
- **Category A:**
  - `import { cn } from '@/lib/utils';`
- **Category B:** None found.
- **Category C:** None found.

#### File: header.tsx (in layout)
- **Category A:** None found.
- **Category B:** None found.
- **Category C:**
  - `import { SidebarTrigger } from '../ui/sidebar';`
  - `import { Separator } from '../ui/separator';`
  - `import { Breadcrumbs } from '../breadcrumbs';`

#### File: providers.tsx (in layout)
- **Category A:** None found.
- **Category B:** None found.
- **Category C:**
  - `import ThemeProvider from './ThemeToggle/theme-provider';`

---

### Directory: table-helpers

#### File: table-column-utils.tsx
- **Category A:**
  - `import { formatETB } from '@/utils/helpers/common-helpers';`
- **Category B:** None found.
- **Category C:** None found.

---

### Directory: modal

#### File: SimpleDialog.tsx
- **Category A:** None found.
- **Category B:** None found.
- **Category C:**
  - `import { ModalBaseProps } from './common-modal-props';`

---

### Directory: kbar

#### File: index.tsx (in kbar)
- **Category A:** None found.
- **Category B:** None found.
- **Category C:**
  - `import RenderResults from './render-result';`
  - `import useThemeSwitching from './use-theme-switching';`

#### File: render-result.tsx (in kbar)
- **Category A:** None found.
- **Category B:** None found.
- **Category C:**
  - `import ResultItem from './result-item';`

---

### Directory: common

#### File: app-table/table-filters/app-table-filter.tsx
- **Category A:**
  - `import { useToggle } from '@/hooks/use-toggle';`
- **Category C:**
  - `import { AppTableFilterDataProps } from '../app-table-types';`

#### File: common-table-columns.tsx
- **Category A:**
  - `import { AppColumnDef } from '@/components/common/app-table/app-table-types';`
  - `import { DateOrString } from '@/types/general-types';`
  - `import { DateFormatter } from '../../.../utils/helpers/date-time-helper';`
- **Category C:** None found.

#### File: flexible/QueryBasedPagination.tsx
- **Category A:**
  - `import { IPrismaPagination } from '@/types/report/report-types';`
  - `import { cn } from '@/lib/utils';`
- **Category C:** None found.

#### File: flexible/mobile-table-utils.tsx
- **Category A:** None found.
- **Category C:**
  - `import { MobileViewConfig } from './flexible-table-types';`

#### File: flexible/flexible-app-table.tsx
- **Category A:** None found.
- **Category C:**
  - `import { AppTableProps } from './flexible-table-types';`
  - `import { renderMobileCards } from './mobile-table-utils';`
  - `import { renderDesktopTable } from './desktop-table-utils';`

#### File: flexible/flexible-table-types.tsx
- **Category A:**
  - `import { IPrismaPagination } from '@/types/report/report-types';`
- **Category C:** None found.

#### File: flexible/app-table-filters.tsx
- **Category A:** None found.
- **Category C:**
  - `import { MobileViewConfig, TableFilterConfig } from './flexible-table-types';`

#### File: flexible/desktop-table-utils.tsx
- **Category A:** None found.
- **Category C:**
  - `import { TableFilterConfig } from './flexible-table-types';`

#### File: AppTable.tsx (in common/app-table)
- **Category A:** None found.
- **Category C:**
  - `import { AppTableProps } from './app-table-types';`
  - `import { useTableFilter } from './useTableFilter';`
  - `import AppTableFilter from './table-filters/app-table-filter';`
  - `import DesktopTableView from './table-views/app-table-desktop-view';`
  - `import MobileTableView from './table-views/app-table-mobile-view';`
  - `import AppTablePagination from './flexible/pagination/app-table-pagination';`

#### File: table-views/sm-view.tsx
- **Category A:** None found.
- **Category C:**
  - `import { AppColumnDef } from '../app-table-types';`

#### File: table-views/app-table-desktop-view.tsx
- **Category A:** None found.
- **Category C:**
  - `import { AppColumnDef } from '../app-table-types';`

#### File: table-views/app-table-mobile-view.tsx
- **Category A:** None found.
- **Category C:**
  - `import { AppColumnDef } from '../app-table-types';`

#### File: common/forms/CustomForm.tsx
- **Category A:**
  - `import { CustomFormInput } from './form-inputs/DynamicFormInput';`
  - `import { CustomFormSelect } from './form-inputs/DynamicFormSelect';`
- **Category C:** None found.

#### File: common/forms/form-inputs/DynamicFormInput.tsx
- **Category A:**
  - `import { useToggle } from '@/hooks/use-toggle';`
- **Category C:**
  - `import { CustomInputProps, DynamicFormInputProps } from '../form-types';`

#### File: common/forms/form-inputs/DynamicFormSelect.tsx
- **Category A:**
  - `import { useToggle } from '@/hooks/use-toggle';`
- **Category C:** None found.

#### File: common/forms/AppSelect.tsx
- **Category A:**
  - `import { LabelValueProp } from '@/types/general-types';`
- **Category C:** None found.

#### File: common/forms/DynamicForm.tsx
- **Category A:** None found.
- **Category C:**
  - `import { CustomFormInputProps, DynamicFormInputProps } from './form-types';`

#### File: common/UnAuthorizedCard.tsx
- **Category A:**
  - `import { useLink } from '@/hooks/useLink';`
- **Category C:** None found.

#### File: common/ErrorMessageCard.tsx
- **Category A:**
  - `import { GENERAL_ERROR_MESSAGE } from '@/utils/constants/common-constants';`
- **Category C:** None found.

#### File: common/combo-box/AppComboBoxWithUrl.tsx
- **Category A:**
  - `import { cn } from '@/lib/utils';`
- **Category C:**
  - `import { AppComboBoxPropsWithUrl } from './combo-box-types';`

#### File: common/combo-box/AppComboBox.tsx
- **Category A:**
  - `import { cn } from '@/lib/utils';`
  - `import { useQueryParams } from '@/hooks/use-query-params';`
- **Category C:** None found.

#### File: common/dialogs/DeleteConfirmationDialog.tsx
- **Category A:**
  - `import { ActiveStatus } from '@/types/api-calls/backend-enums';`
  - `import { useToggle } from '@/hooks/use-toggle';`
  - `import { GENERAL_ERROR_MESSAGE } from '@/utils/constants/common-constants';`
- **Category C:** None found.

#### File: common/dialogs/ChangeStatusDialog.tsx
- **Category A:**
  - `import { ActiveStatus } from '@/types/api-calls/backend-enums';`
  - `import { useToggle } from '@/hooks/use-toggle';`
  - `import { GENERAL_ERROR_MESSAGE } from '@/utils/constants/common-constants';`
- **Category C:** None found.

#### File: common/ui-elements/app-badge.tsx
- **Category A:**
  - `import { cn } from '@/lib/utils';`
- **Category C:** None found.

#### File: common/ui-elements/StatusBadge.tsx
- **Category A:**
  - `import { cn } from '@/lib/utils';`
  - `import { ActiveStatus, TicketStatus } from '@/types/api-calls/backend-enums';`
  - `import { getStatusMapForTicketStatus } from '@/utils/helpers/ui-format-helpers';`
- **Category C:** None found.

#### File: common/data-table/filters/data-table-search.tsx
- **Category A:**
  - `import { cn } from '@/lib/utils';`
- **Category C:** None found.

#### File: common/data-table/filters/data-table-filter-box.tsx
- **Category A:**
  - `import { cn } from '@/lib/utils';`
  - `import { TableFilterDropDownOption } from '@/types/component-types/table-types';`
- **Category C:** None found.

#### File: common/data-table/DataTableFacetedFilter.tsx
- **Category A:**
  - `import { cn } from '@/lib/utils';`
- **Category C:** None found.

#### File: common/data-table/DataTableToolbar.tsx
- **Category A:** None found.
- **Category C:**
  - `import { DataTableFacetedFilter } from './DataTableFacetedFilter';`
  - `import { DataTableViewOptions } from './DataTableViewOptions';`

---

### Directory: app-form

#### File: commons/form-common-elements.tsx
- **Category A:**
  - `import { cn } from '@/lib/utils';`
- **Category C:** None found.

#### File: commons/app-form-buttons.tsx
- **Category A:**
  - `import { cn } from '@/lib/utils';`
- **Category C:** None found.

#### File: form-elements/FormElementLayout.tsx
- **Category A:**
  - `import { cn } from '@/lib/utils';`
- **Category C:** None found.

#### File: form-elements/form-test.tsx
- **Note:** Import statements are commented out.
- **Category A, B, C:** None active.

#### File: form-elements/app-form-inputs/number-input.tsx
- **Category A:**
  - `import { cn } from '@/lib/utils';`
- **Category C:** None found.

#### File: form-elements/app-form-inputs/app-form-input.tsx
- **Category A:**
  - `import { cn } from '@/lib/utils';`
- **Category C:** None found.

#### File: form-elements/app-form-selects/app-form-radio.tsx
- **Category A:**
  - `import { cn } from '@/lib/utils';`
- **Category C:** None found.

#### File: form-elements/app-form-selects/app-form-checkbox.tsx
- **Category A:**
  - `import { cn } from '@/lib/utils';`
- **Category C:** None found.

#### File: form-elements/app-form-selects/app-form-select.tsx
- **Category A:**
  - `import { cn } from '@/lib/utils';`
- **Category C:** None found.

#### File: app-form-test.tsx
- **Note:** Import statements are commented out.
- **Category A, B, C:** None active.

#### File: app-form-date.tsx
- **Category A:**
  - `import { cn } from '@/lib/utils';`
- **Category C:**
  - `import { AppFormMessage } from './commons/form-common-elements';`

#### File: app-form-wrapper.tsx
- **Category A:**
  - `import { useToggle } from '@/hooks/use-toggle';`
  - `import { GENERAL_ERROR_MESSAGE } from '@/utils/constants/common-constants';`
  - `import { cn } from '@/lib/utils';`
- **Category C:**
  - `import { CardSkeleton } from '../common/PageSkeleton';`
  - `import { Alert, AlertDescription, AlertTitle } from '../ui/alert';`
  - `import { Separator } from '../ui/separator';`
  - `import { AppFormAlert, FormActions } from './commons/form-common-elements';`

#### File: app-form-range.tsx
- **Category A:**
  - `import { cn } from '@/lib/utils';`
- **Category C:** None found.

---

_End of Import Map._
