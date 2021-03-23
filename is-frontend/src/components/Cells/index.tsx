import React, { useCallback, useMemo, useState } from 'react';
import * as UI from './styles';
import { columns } from './columns';
import EditableTable from '../../UI/EditableTable';
import 'moment/locale/ru';
import { useSelector, useDispatch } from 'react-redux';
import { loadingSelector } from '../../store/modules/equipment';
import { Cell } from '../../models/Cell';
import { mappedItemsByDate } from '../../helpers/items';
import { updateAllCells } from '../../store/modules/cells';
import { setModalContent, setShowModal } from '../../store/modules/modal';
import AddItemModal from '../Modals/AddItemModal';


interface ICellsProps {
  cells: Cell[],
}

const Equipment: React.FC<ICellsProps> = ({
  cells,
}) => {

  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);

  const filteredCells = useMemo(() => {
    return cells.map((cell: Cell) => {
      return {
        ...cell,
        items: mappedItemsByDate(cell.items)
      }
    })
  }, [cells]);

  const handleCellsUpdate = useCallback((newCells: Partial<Cell>[]) => {
    dispatch(updateAllCells(newCells));
  }, [cells]);

  const handleAddItem = useCallback((cellId: string) => {
    dispatch(setShowModal(true));
    dispatch(setModalContent(<AddItemModal cellId={cellId} />))
  }, [cells]);


  return (
    <UI.CellsWrapper>
      <EditableTable
        originData={filteredCells}
        onUpdate={handleCellsUpdate}
        onButtonClick={(cellId:string) => handleAddItem(cellId)}
        loading={loading}
        recordType={!!cells[0] && cells[0]}
        columns={columns}
      />
    </UI.CellsWrapper>
  );
}

export default Equipment;
