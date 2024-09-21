// src/pages/AssetManagement.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Table, Input, Button, Modal, Form, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'leaflet/dist/leaflet.css';

const { Option } = Select;

// Assumed initial dataset
const initialAssets = [
  { id: 1, name: "Municipal Vehicle 1", type: "vehicle", status: "active", latitude: 51.505, longitude: -0.09 },
  { id: 2, name: "City Hall", type: "building", status: "active", latitude: 51.51, longitude: -0.1 },
  { id: 3, name: "Maintenance Equipment", type: "equipment", status: "maintenance", latitude: 51.515, longitude: -0.08 },
];

const AssetManagement = () => {
  const [assets, setAssets] = useState(initialAssets);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingAsset, setEditingAsset] = useState(null);

  const showModal = (asset = null) => {
    setEditingAsset(asset);
    if (asset) {
      form.setFieldsValue(asset);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingAsset) {
        setAssets(assets.map(asset => asset.id === editingAsset.id ? { ...asset, ...values } : asset));
        message.success('Asset updated successfully');
      } else {
        const newAsset = { ...values, id: assets.length + 1 };
        setAssets([...assets, newAsset]);
        message.success('Asset added successfully');
      }
      setIsModalVisible(false);
    });
  };

  const handleDelete = (id) => {
    setAssets(assets.filter(asset => asset.id !== id));
    message.success('Asset deleted successfully');
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Asset Management</h1>
      <Button icon={<PlusOutlined />} onClick={() => showModal()} style={{ marginBottom: '20px' }}>
        Add Asset
      </Button>
      <Table dataSource={assets} columns={columns} />
      <div style={{ height: '400px', marginTop: '20px' }}>
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {assets.map((asset) => (
            <Marker key={asset.id} position={[asset.latitude, asset.longitude]}>
              <Popup>{asset.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <Modal
        title={editingAsset ? 'Edit Asset' : 'Add Asset'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select>
              <Option value="vehicle">Vehicle</Option>
              <Option value="equipment">Equipment</Option>
              <Option value="building">Building</Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="active">Active</Option>
              <Option value="maintenance">Maintenance</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item name="latitude" label="Latitude" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="longitude" label="Longitude" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AssetManagement;