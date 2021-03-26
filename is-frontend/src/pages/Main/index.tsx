import React, { useMemo, useCallback, useEffect } from 'react';
import * as UI from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, itemsSelector, loadingSelector } from '../../store/modules/items';
import { useHistory } from 'react-router-dom';
import { Tabs } from 'antd';
import Items from '../../components/Items';
import { tabs } from './tabsData';
import Cells from '../../components/Cells';
import Equipment from '../../components/Equipment';
import { cellsSelector, fetchCells } from '../../store/modules/cells';
import { equipmentSelector, fetchEquipment } from '../../store/modules/equipment';
import { getMappedItems } from '../../helpers/items';

const { TabPane } = Tabs;

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const items = useSelector(itemsSelector);
  const cells = useSelector(cellsSelector);
  const equipment = useSelector(equipmentSelector);

  const filteredItems = useMemo(() => {
    return getMappedItems(items);
  }, [items]);

  const getComponentFromTab = useCallback((name: string) => {
    switch (name) {
      case 'items':
        return <Items items={filteredItems} />;
      case 'cells':
        return <Cells cells={cells} items={filteredItems} />
      case 'equipment':
        return <Equipment equipment={equipment} items={filteredItems} />
      default:
        return <></>
    }
  }, [filteredItems, cells, equipment]);

  return (
    <UI.Wrapper>
      <Tabs>
        {tabs.map(tab => (
          <TabPane 
            tab={tab.tab} 
            key={tab.key}
            >
              {getComponentFromTab(tab.name)}
          </TabPane>
        ))}
      </Tabs>
    </UI.Wrapper>
  );
}

export default Home;
