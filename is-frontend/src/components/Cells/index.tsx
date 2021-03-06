import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as UI from './styles';
import { columns } from './columns';
import EditableTable from '../../UI/EditableTable';
import 'moment/locale/ru';
import { useSelector, useDispatch } from 'react-redux';
import { loadingSelector } from '../../store/modules/equipment';
import { Cell } from '../../models/Cell';
import { getMappedItems } from '../../helpers/items';
import { setModalContent, setShowModal } from '../../store/modules/modal';
import AddItemModal from '../Modals/AddItemModal';
import { Item } from '../../models/Item';
import AddItemToCell from '../Modals/AddExactItem';
import AddExactItem from '../Modals/AddExactItem';


interface ICellsProps {
  cells: Cell[],
  items: Item[]
}

const Cells: React.FC<ICellsProps> = ({
  cells,
  items
}) => {

  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);

  const filteredCells = useMemo(() => {
    return cells.map((cell: Cell) => {
      return {
        ...cell,
        items: getMappedItems(cell.items)
      }
    })
  }, [cells]);

  const filterItems = (cellId: string) => {
    const newItems = items.filter((item: any) => (item.cellId !== cellId) && (item.status !== 'Отправлен'));
    return newItems;
  };


  const handleAddItem = (cellId: string) => {
    const filteredItems = filterItems(cellId);
    dispatch(setShowModal(true));
    dispatch(setModalContent(<AddExactItem cellId={cellId} items={filteredItems} />))
  };


  return (
    <UI.CellsWrapper>
      <EditableTable
        originData={filteredCells}
        onButtonClick={(cellId: string) => handleAddItem(cellId)}
        loading={loading}
        recordType={!!cells[0] && cells[0]}
        columns={columns}
      />
    </UI.CellsWrapper>
  );
}

export default Cells;
