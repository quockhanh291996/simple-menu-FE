import {
  Grid,
  IconButton,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NewCategoryDialog } from '~components/category/new-category-dialog/new-category-dialog';
import { CATEGORY_STATE } from '~stores/category/category.info';
import { globalRootStore } from '~stores/root';
import { CategorySelection } from '../category-selection/category-selection';

export const CategoryForm: React.FC = observer(() => {
  const { t } = useTranslation();
  const {
    CategoryStore: {
      state,
      create,
      fetchAll,
      categoryList,
      currentCategory,
      setCurrentCategory,
      delete: deleteCategory,
    },
    GlobalDialogStore,
  } = useContext(globalRootStore);

  // state to handle the add new dialog
  const [openAddNewDialog, setOpenAddNewDialog] = useState(false);

  /** Component's method handle new category dialog */
  const showAddNewDialog = () => {
    setOpenAddNewDialog(true);
  };

  const closeAddNewDialog = () => {
    setOpenAddNewDialog(false);
  };

  const onCreateCategory = (data: any) => {
    create(data);
  };

  /** Component's method handle delet category */
  const confirmDeleteCategory = () => {
    GlobalDialogStore.setType('confirmation');
    GlobalDialogStore.setMessage(t('categoryForm.confirmDelete'));
    GlobalDialogStore.setConfirmCallback(() => {
      if (currentCategory) {
        deleteCategory(currentCategory.id);
      }
    });
    GlobalDialogStore.open();
  };

  /** Hooks */
  useEffect(() => {
    switch (state) {
      case CATEGORY_STATE.IDLE:
      case CATEGORY_STATE.DELELE_CATEGORY_SUCCESS:
        {
          fetchAll();
        }
        break;
      case CATEGORY_STATE.ADD_CATEGORY_SUCCESS: {
        fetchAll();
        closeAddNewDialog();
      }
      default: {
      }
    }
  }, [state]);

  return (
    <React.Fragment>
      <Grid container direction={'row'} spacing={2} alignItems={'center'}>
        {/* Title */}
        <Grid item xs={1}>{t('categoryForm.title')}:</Grid>

        {/* Category selection */}
        <Grid item>
          <CategorySelection options={categoryList} selectedItem={currentCategory} onChange={setCurrentCategory}/>
        </Grid>

        <Grid item>
          <IconButton color="primary" onClick={showAddNewDialog}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Grid>

        <Grid item>
          <IconButton color="primary" onClick={confirmDeleteCategory}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>

      {/* Add new dialog */}

      <NewCategoryDialog
        open={openAddNewDialog}
        onClose={closeAddNewDialog}
        onCreate={onCreateCategory}
      />
    </React.Fragment>
  );
});
